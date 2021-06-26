import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class PoolService {

  constructor(
    public http: HttpClient
  ) { }

  public async graphic(graphic: string) {
    return new Promise(resolve => {
      this.http.post(`${API}/graphic/${graphic}`, {}).subscribe(
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


