import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  constructor(protected httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get(endpoint: string): Observable<T[]> {
    const url = `${environment.apiUrl}/${endpoint}`;
    return this.httpClient.get<T[]>(url, this.httpOptions);
  }

  getOne(endpoint: string, _id: string): Observable<T> {
    const url = `${environment.apiUrl}/${endpoint}/${_id}`;
    return this.httpClient.get<T>(url, this.httpOptions);
  }

  post(endpoint: string, data: T): Observable<T> {
    const url = `${environment.apiUrl}/${endpoint}`;
    return this.httpClient.post<T>(url, data, this.httpOptions);
  }

  patch(endpoint: string, data: T, _id: string): Observable<T> {
    const url = `${environment.apiUrl}/${endpoint}/${_id}`;
    return this.httpClient.patch<T>(url, data, this.httpOptions);
  }

  delete(endpoint: string, _id: string): Observable<T> {
    const url = `${environment.apiUrl}/${endpoint}/${_id}`;
    return this.httpClient.delete<T>(url, this.httpOptions);
  }
}
