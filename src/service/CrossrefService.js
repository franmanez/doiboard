import http from "../http-common";

class CrossrefService {

    ENDPOINT_PREFIXES = '/prefixes';
    MAILTO = "&mailto=info.idp@upc.edu"


    memberInfo = async (prefix) => {
        try {
            const response = await http.get(`/members?filter=prefix:${prefix}${this.MAILTO}`)

            let obj = response.data.message.items[0]['counts-type'].all
            const total = Object.values(obj).reduce((count, value) => count + value, 0);

            let result = {
                'all': response.data.message.items[0]['counts-type'].all,
                'total': total,
                'coverage': response.data.message.items[0]['coverage-type'].all,
                //'total': response.data.message['total-results'],
                //'facets': response.data.message.facets['type-name'].values
            }
            return result
        } catch (e) {
            alert('Request ERROR: ' + e.message);
        }
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

    getApprovedDate = async (prefix, type) => {
        let map = new Map()
        let offset = 0
        let result = {}

        do {
            try {
                //console.log(`${this.ENDPOINT_PREFIXES}/${prefix}/works?filter=type:dissertation&select=approved&offset=${offset}&rows=1000`)
                const response = await http.get(`${this.ENDPOINT_PREFIXES}/${prefix}/works?filter=type:${type}&select=approved&offset=${offset}&rows=1000`)

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
            const response = await http.get(`${this.ENDPOINT_PREFIXES}/${prefix}/works?filter=type:${type}&facet=published:*&rows=0`)

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
            const response = await http.get(`${this.ENDPOINT_PREFIXES}/${prefix}/works?filter=type:${type}&sort=created&order=asc&rows=1`)
            return response.data.message.items[0].created['date-parts'][0][0]
        } catch (e) {
            alert('Request ERROR: ' + e.message);
        }
    }

    mostReferenced = async (prefix, number) => {
        try {
            const response = await http.get(`${this.ENDPOINT_PREFIXES}/${prefix}/works?select=title,DOI,type,is-referenced-by-count&sort=is-referenced-by-count&order=desc&rows=${number}`)
            return response.data.message.items
        } catch (e) {
            alert('Request ERROR: ' + e.message);
        }
    }

    details = async (prefix) => {
        try {
            const response = await http.get(`${this.ENDPOINT_PREFIXES}/${prefix}/works?select=title,DOI,type,is-referenced-by-count&sort=is-referenced-by-count&order=desc&rows=0`)
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

    getDois = async (prefix, page, size) => {
        try {
            const response = await http.get(`/prefixes/${prefix}/works?select=DOI,title,type&sort=created&rows=${size}${this.MAILTO}`)
            return response.data.message
        } catch (e) {
            alert('Request ERROR: ' + e.message);
        }
    }


}

export default new CrossrefService()
