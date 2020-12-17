# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Enviroment
Before run create enviroments folders with enviroments file "enviroments.env" like this:
```ts
export const environment = {
  production: false,
  GOOGLE_CLIENT_ID: '<google clientId>',
  FACEBOOK_CLIENT_ID: '<facebook clientId>',
  MICROSOFT_CLIENT_ID: '<Microsoft Azure clientId>',
  MICROSOFT_AUTHORITY: 'https://login.microsoftonline.com/{tenantId}',
  REDIRECT_URI: 'http://localhost:4200/'
};
```
## Social Developed

- [**Google**](https://developers.google.com/adwords/api/docs/guides/authentication)
- [**Azure Active Directory**](https://docs.microsoft.com/it-it/azure/active-directory/develop/howto-create-service-principal-portal)

