import { Component, OnInit } from '@angular/core';
import { MicrosoftLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-microsoft-auth',
  templateUrl: './microsoft-auth.component.html',
  styleUrls: ['./microsoft-auth.component.scss']
})
export class MicrosoftAuthComponent implements OnInit {

  user: SocialUser | undefined;
  loggedIn: boolean = false;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService) { }

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


        if (this.loggedIn) {
          this.authService.authData(this.user).subscribe(res => {
            this.authService.token = res.jwttoken;
            console.log('token: ', this.authService.token);
          }, err => {
            console.error(err);
          });
        }
      }).catch(err => {
        console.error('Microsoft Auth: ' + err)
      });
  }

  signOut(): void {
    this.socialAuthService.signOut(true);

  }

}
