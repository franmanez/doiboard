import axios from "axios";

export default axios.create({
  //baseURL: "https://idp2.upc.edu:7008/georebiun",
  baseURL: "https://api.crossref.org/prefixes",
  headers: {
    "Content-type": "application/json"
  }
});


