import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private http: HttpClient,
  ) { }


  listEmployees() : Observable<any> {
    return this.http.get<any>(environment.uri + `/api/Employee/list`)
    .pipe(
      map( res => res )
    );
  };

  addEmployee(body:any) : Observable<any> {
    return this.http.post<any>(environment.uri + `/api/Employee/add`, body)
    .pipe(
      map( res => res )
    );
  }

  editEmployee(body: object) : Observable<any> {
    return this.http.put<any>(environment.uri + `/api/Employee/update`, body)
    .pipe(
      map( res => res )
    );
  }

  disabledEmployee(employeeId: string, isActive: boolean) : Observable<any> {
    return this.http.patch<any>(environment.uri + `/api/Employee/id/${employeeId}/set-active/${isActive}`, {})
    .pipe(
      map( res => res )
    );
  }

  deleteEmployee(employeeId) {
    return this.http.delete<any>(environment.uri + `/api/Employee/delete/${employeeId}`)
    .pipe(
      map( res => res )
    );
  }

}
