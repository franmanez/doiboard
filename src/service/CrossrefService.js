import http from "../http-common";
import store from '@/store';
import {format} from "date-fns";

class CrossrefService {

    MAILTO = "&mailto=info.idp@upc.edu"


    memberInfo = async (prefix) => {

        const response = await http.get(`/members?filter=prefix:${prefix}${this.MAILTO}`)

        let obj = response.data.message.items[0]['counts-type'].all
        const total = Object.values(obj).reduce((count, value) => count + value, 0);

        let result = {
            'name':response.data.message.items[0]['primary-name'],
            'all': response.data.message.items[0]['counts-type'].all,
            'total': total,
            'coverage': response.data.message.items[0]['coverage-type'].all,
            //'total': response.data.message['total-results'],
            //'facets': response.data.message.facets['type-name'].values
        }

        store.commit('setMemberName', result.name)

        return result

    }

    /*const getPrefix = async () => {
        clear()
        try {
            const response = await http.get('/prefixes/'+prefix.value+'/works?facet=type-name:*&rows=0')
            //const responseJson = await response.data

            contentPrefix.value = {
                'status': response.data.status,
                'total': response.data.message['total-results'],
                'facets': response.data.message.facets['type-name'].values
            }

            //for(let keyTypeName in contentPrefix.value.facets) {
              //await getPublishedByTypeName(prefix.value, map[keyTypeName])
              //console.log("name: " + keyTypeName + ", value: "+ contentPrefix.value.facets[keyTypeName]);
            //}

        } catch (e) {
            error.value = 'Request ERROR: ' + e.message;
        }
    }
    */

    getApprovedDateForDissertation = async (prefix, type) => {
        let map = new Map()
        let offset = 0
        let result = {}

        do {
            try {
                //console.log(`${this.ENDPOINT_PREFIXES}/${prefix}/works?filter=type:dissertation&select=approved&offset=${offset}&rows=1000`)
                const response = await http.get(`/prefixes/${prefix}/works?filter=type:${type}&select=approved&offset=${offset}&rows=1000${this.MAILTO}`)

                result = {
                    'items': response.data.message.items,
                    'length': response.data.message.items.length
                }

                result.items.forEach((item) => {
                    let year = item.approved['date-parts'][0][0]
                    if(map.has(year)) map.set(year, map.get(year) + 1)
                    else map.set(year, 1)
                });

                offset += 1000


            } catch (e) {
                alert('Request ERROR: ' + e.message);
            }
        } while (result.length > 0)

        let mapOrder = new Map([...map.entries()].sort());
        const mapJson = Object.fromEntries([...mapOrder]);
        //console.log(Array.from(orderMap))

        return mapJson

    }


    getPublishedDate = async (prefix, type) => {
        let map = new Map()
        let result = {}


        try {
            const response = await http.get(`/prefixes/${prefix}/works?filter=type:${type}&facet=published:*&rows=0${this.MAILTO}`)

            result = {
                'items': response.data.message.facets.published.values,
                'length': response.data.message.facets.published.values.length
            }

            return result.items

            /*result.items.forEach((item) => {
                let year = item.approved['date-parts'][0][0]
                if(map.has(year)) map.set(year, map.get(year) + 1)
                else map.set(year, 1)
            });*/



        } catch (e) {
            alert('Request ERROR: ' + e.message);
        }


        let mapOrder = new Map([...map.entries()].sort());
        //console.log(mapOrder)
        //console.log(Array.from(orderMap))

        return mapOrder

    }


    getYearFirstDepositByType = async (prefix, type) => {
        try {
            const response = await http.get(`/prefixes/${prefix}/works?filter=type:${type}&sort=created&order=asc&rows=1${this.MAILTO}`)
            return response.data.message.items[0].created['date-parts'][0][0]
        } catch (e) {
            alert('Request ERROR: ' + e.message);
        }
    }

    getDepositByType = async (prefix, type) => {
        try {
            let yearFirstDeposit = await this.getYearFirstDepositByType(prefix, type)
            const jsonData = {};
            for (let year = yearFirstDeposit; year <= new Date().getFullYear(); year++) {
                const response = await http.get(`/prefixes/${prefix}/works?filter=type:${type},from-created-date:${year},until-created-date:${year}&rows=0${this.MAILTO}`)
                if(response.data.message['total-results'] > 0){
                    console.log(year + ": " + response.data.message['total-results'])
                    jsonData[year] = response.data.message['total-results']
                }

            }

            return jsonData


        } catch (e) {
            alert('Request ERROR: ' + e.message);
        }
    }

    mostReferencedDois = async (prefix, number) => {
        const response = await http.get(`/prefixes/${prefix}/works?select=title,DOI,type,is-referenced-by-count&sort=is-referenced-by-count&order=desc&rows=${number}${this.MAILTO}`)
        return response.data.message.items
    }

    mostReferencedOrcids = async (prefix, number) => {
        const response = await http.get(`/prefixes/${prefix}/works?rows=0&facet=orcid:${number}${this.MAILTO}`)
        let values = response.data.message.facets.orcid.values

        //transformar de JSON en array de Objects
        const result = Object.keys(values).map(function(key) {
            return { orcid: key, count: values[key] };
        });
        return result
    }

    details = async (prefix) => {
        try {
            const response = await http.get(`/prefixes/${prefix}/works?select=title,DOI,type,is-referenced-by-count&sort=is-referenced-by-count&order=desc&rows=0${this.MAILTO}`)
            //return response.data.message.items

            let contentPrefix = {
                'status': response.data.status,
                //'total': response.data.message['total-results'],
                //'facets': response.data.message.facets['type-name'].values
            }
            return contentPrefix
        } catch (e) {
            alert('Request ERROR: ' + e.message);
        }
    }

    getDois = async (prefix, page, size, query, date, documentType) => {
        let querySearch = ''
        let filterSearch = ''

        if(query){
            querySearch = `&query=${query}`
        }

        if(date){
            filterSearch = `&filter=from-deposit-date:${format(date[0], 'yyyy-MM-dd')},until-deposit-date:${format(date[1], 'yyyy-MM-dd')}`
        }

        if(documentType){
            if (filterSearch.startsWith('&filter=')) {
                filterSearch += `,type:${documentType}`
            }else{
                filterSearch += `&filter=type:${documentType}`
            }

        }

        const response = await http.get(`/prefixes/${prefix}/works?select=DOI,title,type,deposited,author,is-referenced-by-count&sort=deposited&order=desc&offset=${page}&rows=${size}${querySearch}${filterSearch}${this.MAILTO}`)
        return response.data.message
    }

    getDoisCSV = async (prefix, query, date, documentType) => {
        let querySearch = ''
        let filterSearch = ''
        let cursor = '*'

        if(query){
            querySearch = `&query=${query}`
        }

        if(date){
            filterSearch = `&filter=from-deposit-date:${format(date[0], 'yyyy-MM-dd')},until-deposit-date:${format(date[1], 'yyyy-MM-dd')}`
        }

        if(documentType){
            if (filterSearch.startsWith('&filter=')) {
                filterSearch += `,type:${documentType}`
            }else{
                filterSearch += `&filter=type:${documentType}`
            }

        }

        let items = []

        let response
        do {
            response = await http.get(`/prefixes/${prefix}/works?select=DOI,URL,title,type,created,deposited,is-referenced-by-count&sort=deposited&order=desc&rows=1000&cursor=${cursor}${querySearch}${filterSearch}${this.MAILTO}`)
            cursor = response.data.message['next-cursor']


            response.data.message.items.forEach((item) => {

                let result = {
                    'doi':item.DOI,
                    'url': item.URL,
                    'type': item.type,
                    'first-deposited': item.created['date-time'].substring(0, 10),
                    'last-deposited': item.deposited['date-time'].substring(0, 10),
                    'title': item.title[0],
                }
                items = [...items, result];

            });

        }while (response.data.message.items.length > 0)

        return items
    }

    getMembers = async (page, size, query) => {
        let filterQuery = ''
        if(query){
            filterQuery = `&query=${query.replaceAll(' ', '+')}`
        }
        const response = await http.get(`/members?offset=${page}&rows=${size}${filterQuery}${this.MAILTO}`)
        return response.data.message
    }

    getTypes = async () => {
        const response = await http.get(`/types?mailto=info.idp@upc.edu`)
        return response.data.message.items.sort((a, b) => {
            return a.label.localeCompare(b.label);
        });
    }


}

export default new CrossrefService()
