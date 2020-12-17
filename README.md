# Angular Social Login

Example of login implementation through Auth2 external providers, with access-Token control and generation of a JWT token for application permissions.

The project is divided into 2 sections:
 - Client:
 - Server:
 
## Client

Angular application (Ver. 11) in which the various social networks are logged in (for now the managed providers are Google and Microsoft) via [**angularx-social-login**](https://github.com/abacritt/angularx-social-login#readme) to retrieve the access-token; retrieving the JWT token in the WebService.

## Server

Authorization WebService developed with NodeJs and [**ExpressJs**](https://expressjs.com/) with a login function that checks the access-token with the right provider and, if correct, generates a JWT token for the client for managing permissions;

## Social Developed

- [**Google**](https://developers.google.com/adwords/api/docs/guides/authentication)
- [**Azure Active Directory**](https://docs.microsoft.com/it-it/azure/active-directory/develop/howto-create-service-principal-portal)

