import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, MicrosoftLoginProvider } from 'angularx-social-login';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { FacebookAuthComponent } from './facebook-auth/facebook-auth.component';
import { environment } from '../environments/environment';
import { MicrosoftAuthComponent } from './microsoft-auth/microsoft-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleAuthComponent,
    FacebookAuthComponent,
    MicrosoftAuthComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.GOOGLE_CLIENT_ID
          )
        }, {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(
            environment.FACEBOOK_CLIENT_ID
          )
        }, {
          id: MicrosoftLoginProvider.PROVIDER_ID,
          provider: new MicrosoftLoginProvider(
            environment.MICROSOFT_CLIENT_ID
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
