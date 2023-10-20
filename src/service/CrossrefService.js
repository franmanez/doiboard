import http from "../http-common";

class CrossrefService {

    ENDPOINT_PREFIXES = '/prefixes';

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




}

export default new CrossrefService()