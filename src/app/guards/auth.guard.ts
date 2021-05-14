import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    async canActivate() {
        let isLogin = await this.userService.getToken() != null;
        console.log('isLogin', isLogin);

        if (!isLogin) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }

}