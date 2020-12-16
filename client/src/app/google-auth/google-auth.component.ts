import { Component, OnInit } from '@angular/core';

import { SocialAuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {

  user: SocialUser | undefined;
  loggedIn: boolean = false;

  constructor(private socialAuthService: SocialAuthService) { }

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
      });
  }

  signOut(): void {
    this.socialAuthService.signOut(true);

  }


}
