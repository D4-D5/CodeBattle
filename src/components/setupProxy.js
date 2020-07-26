const proxy = require("http-proxy-middleware");
    module.exports = function(app) {
        app.use(
            proxy("/registerUser",{
                target:"https://d944618407f7.ngrok.io/api/register" ,
                changeOrigin:true
            })
        )
    };