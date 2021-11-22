import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  headers: HttpHeaders;
  url: string;
  valor: string;
  jsonNew: string;
  constructor(public http: HttpClient) {
    this.url = environment.url;
  }
  getGlobal<T>(url: string) {
    return this.http.get<T>(this.url + url).toPromise();
  }
  postGlobal<T>(url: string, objeto: any) {
    return this.http
      .post<T>(this.url + url, objeto, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .toPromise();
  }
  deleteGlobal<T>(url: string, codigo: string) {
    return this.http
      .delete<T>(this.url + url + codigo, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .toPromise();
  }

  putGlobal<T>(url: string, id: string, objeto: any) {
    return this.http
      .put<T>(this.url + url + id, objeto, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .toPromise();
  }
}
