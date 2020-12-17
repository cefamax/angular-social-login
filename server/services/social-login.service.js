
const googleAuthLibrary = require('google-auth-library');
const jwt = require('jsonwebtoken');
const aadManager = require('../azure/azure-active-directory-jwt');

module.exports = {
    google: (user) => {
        return new Promise(async (res, rej) => {

            const client = new googleAuthLibrary.OAuth2Client(GOOGLE_CLIENT_ID);
            try {
                const ticket = await client.verifyIdToken({
                    idToken: user.idToken,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];

                if (user.response.cu == payload.email) {
                    res(generateToken({ provider: user.provider, uid: userid, email: payload.email }));

                } else {
                    rej('Invalid TokenId');
                }

            } catch (err) {
                rej(err.message || err);
            }


        });
    },
    microsoft: (user) => {
        return new Promise((res, rej) => {

            const jwtToken = user.idToken;

            aadManager.verify(jwtToken, null, function (err, result) {
                if (result) {
                    console.log("JWT is valid");
                    res(generateToken({ provider: user.provider, user: user.id, email: user.email }))
                } else {
                    console.log("JWT is invalid: " + err);
                    rej(err.message || err);
                }
            });

        });
    }

};

const generateToken = (tokenPayload) => {
    return jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY);
}
