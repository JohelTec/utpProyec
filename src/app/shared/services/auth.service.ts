import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  setSesionStorage(keyname: string, value: string ): void{
    sessionStorage.setItem(keyname, value)
  }
  getSesionStorage( keyname: string ): string{
    return sessionStorage.getItem(keyname);
  }
  removeSesionStorage( keyname: string ): void{
    sessionStorage.removeItem(keyname);
  }

  public registerFB(body) : Observable<any> {
    return this.http.post<any>(environment.uri + `/registerandLoginfb`, body)
    .pipe(
      map( res => res )
    );
  };

  login(body) : Observable<any> {
    return this.http.post<any>(environment.uri + '/api/Auth/login', body)
    .pipe(
      map( res => res )
    );
  }

  outh2Token(token) : Observable<any> {
    return this.http.get<any>(environment.uri + `/api/Email/OAuthv2/token?code=${token}`)
    .pipe(
      map( res => res )
    );
  }

  outh2() : Observable<any> {
    return this.http.get<any>(environment.uri + '/api/Email/OAuthv2')
    .pipe(
      map( res => res )
    );
  }

  getEmail(email, messageId) : Observable<any> {
    return this.http.get<any>(environment.uri + `/api/Email/Gmail/${email}/message/${messageId}`)
    .pipe(
      map( res => res )
    );
  }

  getSession(email, maxResults) : Observable<any> {
    return this.http.post<any>(environment.uri + `/api/Email/Gmail/inbox/${email}/maxResults/${maxResults}/messages/refresh/true`, {})
    .pipe(
      map( res => res )
    );
  }


}
