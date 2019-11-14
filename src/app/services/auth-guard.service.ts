import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  loginData: boolean;
  constructor(
    public authService: AuthenticationService,
    private router: Router

  ) {
    this.authService.isAuthenticated().subscribe
      (data => this.loginData = data);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginData) {
      // alert("authgaurd "+this.loginData)
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
