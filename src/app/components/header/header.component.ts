import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any = {};
  token: any = {};

  constructor(
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.user = JSON.parse(await this.userService.getUsuario());
    this.token = await this.userService.getToken();

    this.userService.loginEmitter
      .subscribe(response => {
        this.user = response;
      });

    this.userService.logoutEmitter
      .subscribe(async (event) => {
        this.user = JSON.parse(await this.userService.getUsuario());
        this.token = await this.userService.getToken();
      });
  }

  async logout() {
    await this.userService.logout();
  }
}
