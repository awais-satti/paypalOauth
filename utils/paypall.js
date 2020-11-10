const {default:axios} = require('axios');
const {encode} = require('nodejs-base64-encode')

module.exports = async(grant_type='client_credentials',code=null)=>{

    try {
        const PaypalAuthApi = "https://api.sandbox.paypal.com/v1/oauth2/token/"
        body = `grant_type=${grant_type}`;
        if(code){
            body +="&code="+code;
        }
        const basicAuth = encode(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,"base64");
    
    
    
        const token = await axios.post(
            `${PaypalAuthApi}`,
            body,
            {
                headers:{
                    Accept:'application/json',
                    Authorization:`Basic ${basicAuth}`,
                    "content_type":"application/x-www-form-urlencoded"
                }
            }
    
        )
        
        return token.data;
        
    } catch (error) {
        console.log("paypalTOkenError", error);
        return false;
  }
}
   



