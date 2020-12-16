import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-facebook-auth',
  templateUrl: './facebook-auth.component.html',
  styleUrls: ['./facebook-auth.component.scss']
})
export class FacebookAuthComponent implements OnInit {

  user: SocialUser | undefined;
  loggedIn: boolean = false;

  constructor(private socialAuthService: SocialAuthService) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signIn(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.user = user;
        this.loggedIn = (user != null);
      });
  }

  signOut(): void {
    this.socialAuthService.signOut(true);

  }

}
