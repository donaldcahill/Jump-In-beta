import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: HttpHeaders;
  private url: string;
  private valor: string;
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }
  public getGlobal<T>(url: string, token?: string) {
     // localhost.... + /user/all
    if(token) {
      return this.http.get<T>(this.url + url,{
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('token', token)
      });
    } else {
      return this.http.get<T>(this.url + url);
    }
  }
  public postGlobal<T>(object: any, url: string, token?: string) {
    this.valor = JSON.stringify(object);
    if(token) {
      return this.http.post<T>(this.url + url, this.valor, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('token', token)
      });
    } else {
      return this.http.post<T>(this.url + url, this.valor, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
    }
  }
  public deleteGlobal(codigo: string, url: string, token?: string) {
    if (token) {
      return this.http.delete(this.url + url + '/' +  codigo, {
        headers: new HttpHeaders()
          .set('token', token)
          .set('Content-Type', 'application/json'),
      });
    } else {
      return this.http.delete(this.url + url + '/' + codigo, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json'),
      });
    }
  }
  public putGlobal<T>(objeto: any, url: string, id: string, token?: string) {
    this.valor = JSON.stringify(objeto);
    if (token) {
      return this.http.put<T>(this.url + url + id, this.valor, {
        headers: new HttpHeaders()
          .set('token', token)
          .set('Content-Type', 'application/json')
      });
    } else {
      return this.http.put<T>(this.url + url + id, this.valor, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json'),
      });
    }
  }
  public uploadImageFile<T>(file: File, url: string, idSucursal: string, tipo: number) {
    // const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('image', file);
    // return this.http.post<Object>(`${this.url}/image`, formData);
    return this.http.post<T>(this.url + url + `/${idSucursal}/${tipo}` , formData);
  }

  public uploadImagenMenu<T>(file: File, url: string, idMenu: string) {
    // const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('image', file);
    // return this.http.post<Object>(`${this.url}/image`, formData);
    return this.http.post<T>(this.url + url + `/${idMenu}` , formData);
  }
  public getImage(imageUrl: string): Observable<Blob> {
    return this.http.get( this.url + imageUrl, { responseType: 'blob' });
  }

}
