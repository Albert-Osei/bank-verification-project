const axios = require('axios');
const envConfig = require('../config/env/index')

const makeGetRequest = async (url) => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${envConfig.PAYSTACK_SECRET_KEY}`
        }
    };

    const response = await axios.get(url, axiosConfig);
    return response.data 
}


module.exports = {
    makeGetRequest
}