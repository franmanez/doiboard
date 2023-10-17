import axios from "axios";

export default axios.create({
  baseURL: "https://api.crossref.org",
  headers: {
    "Content-type": "application/json"
  }
});


