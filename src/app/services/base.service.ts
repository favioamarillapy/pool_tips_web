import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const API = environment.api;


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public recurso: string = '';

  constructor(
    public http: HttpClient
  ) { }

  public async get(id?, parametros?) {
    const url = (id) ? `${API}/${this.recurso}/${id}` : `${API}/${this.recurso}`;

    const params = new HttpParams({ fromObject: parametros });

    return new Promise(resolve => {
      this.http.get(url, { params }).subscribe(
        (response: any) => {
          resolve(response);
        },
        error => {
          resolve(error.error);
        }
      );
    });
  }

  public async file(service, filename) {
    const url = `${API}/${this.recurso}/file/${filename}`;

    return new Promise(resolve => {
      this.http.get(url, {}).subscribe(
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
      this.http.post(`${API}/${this.recurso}`, data).subscribe(
        (response: any) => {
          resolve(response);
        },
        error => {
          resolve(error.error);
        }
      );
    });
  }

  public update(data: FormData, id) {
    return new Promise(resolve => {
      data.append('_method', 'PUT');
      this.http.post(`${API}/${this.recurso}/${id}`, data).subscribe(
        (response: any) => resolve(response),
        error => resolve(error.error)
      );
    });
  }

  async delete(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return new Promise(resolve => {
      this.http.delete(`${API}/${this.recurso}/${id}`, { headers: headers }).subscribe(
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