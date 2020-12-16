import { Component, OnInit } from '@angular/core';
import { MicrosoftLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-microsoft-auth',
  templateUrl: './microsoft-auth.component.html',
  styleUrls: ['./microsoft-auth.component.scss']
})
export class MicrosoftAuthComponent implements OnInit {

  user: SocialUser | undefined;
  loggedIn: boolean = false;

  constructor(private socialAuthService: SocialAuthService) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.loggedIn = (user != null);
    }, err => {
      console.error('Microsoft Auth: ' + err)
    });
  }

  signIn(): void {
    this.socialAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.user = user;
        this.loggedIn = (user != null);
      }).catch(err => {
        console.error('Microsoft Auth: ' + err)
      });
  }

  signOut(): void {
    this.socialAuthService.signOut();

  }

}
