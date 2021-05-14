import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const API = environment.api;
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() loginEmitter = new EventEmitter();
  @Output() logoutEmitter = new EventEmitter();

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  signin(user: any) {
    return new Promise(resolve => {
      this.http.post(`${API}/auth/signin`, user, { headers })
        .subscribe(async (response: any) => {
          this.loginEmitter.emit(response.user);
          resolve({ success: true, data: response });
        },
          (error) => {
            localStorage.clear();
            resolve({ success: false, error: error.error });
          }
        );
    });
  }

  async signup(token: any) {
    return new Promise(resolve => {
      this.http.post(`${API}/auth/signup`, token, { headers })
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

  logout() {
    localStorage.clear();
    this.logoutEmitter.emit(null)
    this.router.navigate(['/']);
  }

}