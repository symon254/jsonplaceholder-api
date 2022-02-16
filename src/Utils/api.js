import axios from 'axios';

// read axios documentation 

const api = axios.create ({
    baseUrl: "",
    headers:{
        "Content-Type":"application/json"
    }
    
})
export default api