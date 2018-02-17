import { create } from 'apisauce';

const config = {
    baseURL: "http://localhost:4000",
    timeout: 30000,
}

const api = create({
    baseURL: `${config.baseURL}`,
    header: {
        "Accept": "application/json",
        "Content-Type": "application/json"        
    },
    timeout: config.timeout,
})

export default api;