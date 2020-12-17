/**
 * based on https://github.com/dei79/node-azure-ad-jwt
 */
var exports = module.exports;

exports.AzureActiveDirectoryValidationManager = require('./lib/azure-ad-validation-manager');

exports.verify = (jwtString, options, callback) => {

    var aadManager = new exports.AzureActiveDirectoryValidationManager();

    // get the tenant id from the token
    var tenantId = aadManager.getTenantId(jwtString);

    // check if it looks like a valid AAD token
    if (!tenantId) {
        return callback(new Error(-1, 'Not a valid AAD token'), null)
    }

    // download the open id config
    aadManager.requestOpenIdConfig(tenantId, (err, openIdConfig) => {

        // download the signing certificates from Microsoft for this specific tenant
        aadManager.requestSigningCertificates(openIdConfig.jwks_uri, options, (err, certificates) => {

            // verify against all certificates
            aadManager.verify(jwtString, certificates, options, callback);
        })
    });
}