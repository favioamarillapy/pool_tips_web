import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  cargando: boolean = false;
  acceso: boolean = true;
  goForm: boolean = false;
  frmLogin: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.crearFormulario();
    this.goForm = false;
    this.acceso = true;
  }

  async crearFormulario() {
    this.frmLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    this.ngxService.start();
    this.goForm = true;
    if (this.frmLogin.valid) {

      this.cargando = true;
      const response: any = await this.userService.signin(this.frmLogin.value);
      this.cargando = false;

      if (response.success) {
        await localStorage.setItem('pool-tips-token', response.data.access_token);
        await localStorage.setItem('pool-tips-user', JSON.stringify(response.data.user));
        this.ngxService.stop();
        this.router.navigate(['/']);
      } else {
        this.ngxService.stop();
        this.acceso = false;
      };
    }
    this.ngxService.stop();
  }
}