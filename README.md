# Angular Social Login

Esempio di implementazione di login tramite provider esterni Auth2, con controllo dell'access-Token e generazione di un token JWT per le autorizzazioni dell'applicazione.

Il progetto si divide in 2 sezioni:
 - Client: 
 - Server: 


## Client

Applicazione Angular (Ver. 11) in cui viene eseguito il login dei vari social (per ora i provider gestiti sono Google e Microsoft) tramite [**angularx-social-login**](https://github.com/abacritt/angularx-social-login#readme) per recuperare l'access-token; recupero del token JWT nel WebService.

## Server

WebService di autorizzazione sviluppato con NodeJs ed [**ExpressJs**](https://expressjs.com/) con una funzione di login che controlla l'access-token con il giusto provider e, se corretto, genera un token JWT per il client per la gestione delle autorizzazioni;
