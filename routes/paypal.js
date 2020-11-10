const { default: Axios } = require('axios')

const router  = require('express').Router()


router.get('/connect ',async(req,res)=>{
    redirectUrl = "http://localhost:3000/paypal/success";
    const authorizationUrl = `https://www.sandbox.paypal.com/connect?flowEntry=static&client_id=${process.env.PAYPAL_CLIENT_ID}&scope=openid&redirect_uri=${redirectUrl}`
    res.redirect(authorizationUrl)

})

router.get('/success',async(req,res)=>{

    const {code}= req.query;
    const {access_token,refresh_token} = await require('../utils/paypall')('authorization_code',code);
    console.log("access_token :: ",access_token)
    
    const userInfoUrl = "https://api.sandbox.paypal.com/v1/identity/oauth2/userinfo?schema=paypalv1.1";


    const user_info = await Axios.get(
        userInfoUrl,{
            headers:{
                "Content-Type": "application/json",
                Authorization:`Bearer ${access_token}`
            }
        }
        
    )

    console.log("user_Info : ",user_info)



   
})

module.exports = router;    