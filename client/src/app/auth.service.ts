import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialUser } from 'angularx-social-login';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string = '';

  constructor(private httpClient: HttpClient,) { }




  authData(user: SocialUser): Observable<any> {

    return this.httpClient.post('http://localhost:3000/social-login', user).pipe(retry(3));
  }

}
