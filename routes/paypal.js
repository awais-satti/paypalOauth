const router  = require('express').Router()

router.get('/paypal',(req,res)=>{
    const authorizationUrl = `https://www.sandbox.paypal.com/connect?flowEntry=static&client_id=${process.env.PAYPAL_CLIENT_ID}&scope=openid&redirect_uri=qwer`
    res.redirect(authorizationUrl)

})

router.get('/',(req,res)=>{
    res.json('asdasfasd')
})

module.exports = router;    