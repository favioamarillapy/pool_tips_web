import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

const API = environment.api;
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  signin(user: any) {
    return new Promise(resolve => {
      this.http.post(`${API}/auth/signin`, user, { headers })
        .subscribe(async (response: any) => {
          resolve({ success: true, data: response });
        },
          (error) => {
            localStorage.clear();
            resolve({ success: false, error: error.error });
          }
        );
    });
  }

  async signup(user) {
    return new Promise(resolve => {
      this.http.post(`${API}/auth/signup`, user, { headers })
        .subscribe(async (response: any) => {
          resolve({ success: true, data: response });
        },
          (error) => {
            localStorage.clear();
            resolve({ success: false, error: error.error });
          }
        );
    });
  }

  async getUsuario() {
    return await localStorage.getItem('pool-tips-user') || null;
  }

  async getToken() {
    return await localStorage.getItem('pool-tips-token') || null;
  }

  cerrarSession() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}