import { AuthService } from "./authentication.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { map, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.currentUser.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;

        if (isAuth) return true;
        if (!isAuth) return this.router.createUrlTree(["auth"]);
      })
    );
  }
}
