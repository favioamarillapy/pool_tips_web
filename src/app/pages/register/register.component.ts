import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cargando: boolean = false;
  goForm: boolean = false;
  frmLogin: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.crearFormulario();
    this.goForm = false;
  }

  async crearFormulario() {
    this.frmLogin = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    this.goForm = true;
    if (this.frmLogin.valid) {

      this.cargando = true;
      const response: any = await this.userService.signup(this.frmLogin.value);
      this.cargando = false;

      if (response.success) {
        await localStorage.setItem('pool-tips-token', response.data.access_token);
        await localStorage.setItem('pool-tips-user', JSON.stringify(response.data.user));
        this.router.navigate(['/']);
      }
    }
  }

}
