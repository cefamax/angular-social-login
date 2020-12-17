let express = require('express')
let app = express()
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

let socialLoginService = require('./services/social-login.service');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.post('/social-login', async (req, res) => {
    const userData = req.body;

    if ((socialLoginService[userData.provider.toLowerCase()]) && (typeof socialLoginService[userData.provider.toLowerCase()]) === "function") {
        try {
            const jwttoken = await socialLoginService[userData.provider.toLowerCase()](userData);
            res.status('200').jsonp({ jwttoken });
        } catch (error) {
            res.status('401').jsonp({ error: error.message || error });
        }
    } else {
        res.status('401').jsonp({ error: `Unmanaged provider [${userData.provider}]!` });
    }



})

app.listen(process.env.PORT || 8080)