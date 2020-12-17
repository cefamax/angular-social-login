const jsonwebtoken = require('jsonwebtoken');
const request = require('request');
const cache = require('./azure-ad-cache');

class AzureActiveDirectoryValidationManager {


    convertCertificateToBeOpenSSLCompatible = (cert) => {
        //Certificate must be in this specific format or else the function won't accept it
        var beginCert = "-----BEGIN CERTIFICATE-----";
        var endCert = "-----END CERTIFICATE-----";

        cert = cert.replace("\n", "");
        cert = cert.replace(beginCert, "");
        cert = cert.replace(endCert, "");

        var result = beginCert;
        while (cert.length > 0) {

            if (cert.length > 64) {
                result += "\n" + cert.substring(0, 64);
                cert = cert.substring(64, cert.length);
            }
            else {
                result += "\n" + cert;
                cert = "";
            }
        }

        if (result[result.length] != "\n")
            result += "\n";
        result += endCert + "\n";
        return result;
    }

    /*
     * Extracts the tenant id from the give jwt token
     */
    getTenantId = (jwtString) => {
        var decodedToken = jsonwebtoken.decode(jwtString);

        if (decodedToken) {
            return decodedToken.tid;
        } else {
            return null;
        }
    };

    /*
     * This function loads the open-id configuration for a specific AAD tenant
     * from a well known application.
     */
    requestOpenIdConfig = (tenantId, cb) => {
        // we need to load the tenant specific open id config
        var tenantOpenIdconfig = {
            url: 'https://login.windows.net/' + tenantId + '/.well-known/openid-configuration',
            json: true
        };

        var cachedValue = cache.get(tenantOpenIdconfig);
        if (cachedValue) return cb(null, cachedValue);

        request.get(tenantOpenIdconfig, function (error, response, result) {
            if (error) {
                cb(error);
            } else {
                cache.put(tenantOpenIdconfig, result);
                cb(null, result);
            }
        });
    };

    /*
     * Download the signing certificates which is the public portion of the
     * keys used to sign the JWT token.  Signature updated to include options for the kid.
     */
    requestSigningCertificates = (jwtSigningKeysLocation, options, cb) => {
        let self = this;
        var jwtSigningKeyRequestOptions = {
            url: jwtSigningKeysLocation,
            json: true
        };

        var cachedValue = cache.get(jwtSigningKeysLocation);
        if (cachedValue) return cb(null, cachedValue);

        request.get(jwtSigningKeyRequestOptions, function (error, response, result) {
            if (error) {
                cb(error);
            } else {
                var certificates = [];

                //Use KID to locate the public key and store the certificate chain.
                if (options && options.kid) {
                    result.keys.find(function (publicKey) {
                        if (publicKey.kid === options.kid) {
                            publicKey.x5c.forEach(function (certificate) {
                                certificates.push(self.convertCertificateToBeOpenSSLCompatible(certificate));
                            });
                        }
                    })
                } else {
                    result.keys.forEach(function (publicKeys) {
                        publicKeys.x5c.forEach(function (certificate) {
                            certificates.push(self.convertCertificateToBeOpenSSLCompatible(certificate));
                        })
                    });
                }

                // good to go
                cache.put(jwtSigningKeysLocation, certificates);
                cb(null, certificates);
            }
        });
    };

    /*
     * This function tries to verify the token with every certificate until
     * all certificates was testes or the first one matches. After that the token is valid
     */
    verify = (jwt, certificates, options, cb) => {

        // ensure we have options
        if (!options) options = {};

        // set the correct algorithm
        options.algorithms = ['RS256'];

        // set the issuer we expect
        if (!options.issuer)
            options.issuer = 'https://login.microsoftonline.com/' + this.getTenantId(jwt) + '/v2.0';

        var valid = false;
        var lastError = null;

        certificates.every((certificate) => {
            // verify the token
            try {
                // verify the token
                jsonwebtoken.verify(jwt, certificate, options);

                // set the state
                valid = true;
                lastError = null;

                // abort the enumeration
                return false;
            } catch (error) {

                // set teh error state
                lastError = error;

                // check if we should try the next certificate
                if (error.message === 'invalid signature') {
                    return true;
                } else {
                    return false;
                }
            }
        });

        // done
        if (valid) {
            cb(null, jsonwebtoken.decode(jwt));
        } else {
            cb(lastError, null);
        }
    }
}

module.exports = exports = AzureActiveDirectoryValidationManager;
