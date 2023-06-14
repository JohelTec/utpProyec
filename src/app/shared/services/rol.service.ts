import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(
    private http: HttpClient,
  ) { }


  listRoles() : Observable<any> {
    return this.http.get<any>(environment.uri + `/api//Role/role/list`)
    .pipe(
      map( res => res )
    );
  };

  addRol(body: object) : Observable<any> {
    return this.http.post<any>(environment.uri + `/api/Role/role/add`, body)
    .pipe(
      map( res => res )
    );
  }

  deleteRol(roleId) {
    return this.http.delete<any>(environment.uri + `/api/Role/role/delete/${roleId}`)
    .pipe(
      map( res => res )
    );
  }

  updateRol(body: object) : Observable<any> {
    return this.http.put<any>(environment.uri + `/api/Role/role/update`, body)
    .pipe(
      map( res => res )
    );
  }

}
