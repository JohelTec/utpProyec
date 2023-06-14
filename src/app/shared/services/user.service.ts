import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
  ) { }

  public getOcupations() {
    return this.http.get<any>(`${environment.uri}/allocupations`)
      .pipe(
        map( res => res )
      );
  }

  public getInterestByUser() {
    return this.http.get<any>(`${environment.uri}/getinterestsbyuser`)
      .pipe(
        map( res => res )
      );
  }

  public getLifestylesByUser() {
    return this.http.get<any>(`${environment.uri}/getlifestylesbyuser`)
      .pipe(
        map( res => res )
      );
  }

  // get last properties
  public setProfileByUser(body){
    return this.http.post<any>(`${environment.uri}/profileinterestsuser`, body)
      .pipe(
        map( res => res )
      );
  }

  public setInterestUser(body){
    return this.http.post<any>(`${environment.uri}/setInterestUser`, body)
      .pipe(
        map( res => res )
      );
  }

  public setLifestyleUser(body){
    return this.http.post<any>(`${environment.uri}/setLifestyleUser`, body)
      .pipe(
        map( res => res )
      );
  }

  public setComment(body){
    return this.http.post<any>(`${environment.uri}/setcommentsbyuser`, body)
      .pipe(
        map( res => res )
      );
  }

  public getcommentsbyuser(){
    return this.http.get<any>(`${environment.uri}/getcommentsbyuser`)
      .pipe(
        map( res => res )
      );
  }

  public setInterestComment(body){
    return this.http.post<any>(`${environment.uri}/setInterestByComment`, body)
      .pipe(
        map( res => res )
      );
  }
}
