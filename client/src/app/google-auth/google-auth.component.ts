import { Component, OnInit } from '@angular/core';

import { SocialAuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {

  user: SocialUser | undefined;
  loggedIn: boolean = false;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService) { }

  ngOnInit() {
    //this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signIn(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.user = user;
        this.loggedIn = (user != null);

        if (this.loggedIn) {
          this.authService.authData(this.user).subscribe(res => {
            this.authService.token = res.jwttoken;
            console.log('token: ', this.authService.token);
          }, err => {
            console.error(err);
          });
        }

      });
  }

  signOut(): void {
    this.socialAuthService.signOut(true);

  }


}
