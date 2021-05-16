import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.api;
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class TipsService {

  constructor(
    public http: HttpClient
  ) { }

  public async get(id?: any, parametros?) {
    const url = (id) ? `${API}/tips/${id}` : `${API}/tips`;
    const params = new HttpParams({ fromObject: parametros });

    return new Promise(resolve => {
      this.http.get(url, { headers, params }).subscribe(
        (response: any) => {
          resolve(response);
        },
        error => {
          resolve(error.error);
        }
      );
    });
  }

  public async register(data) {
    return new Promise(resolve => {
      this.http.post(`${API}tips`, data, { headers: headers }).subscribe(
        (response: any) => {
          resolve(response);
        },
        error => {
          resolve(error.error);
        }
      );
    });
  }

  public async update(data, id) {
    return new Promise(resolve => {
      this.http.put(`${API}tips/${id}`, data, { headers: headers }).subscribe(
        (response: any) => {
          resolve(response);
        },
        error => {
          resolve(error.error);
        }
      );
    });
  }
}
