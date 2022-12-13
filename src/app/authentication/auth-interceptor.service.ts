import { AuthService } from "./authentication.service";
import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap(user => {
        // Make sure we have a user
        if (!user) return next.handle(req);

        // Modify the req to have access to the token
        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token)
        });

        // Return the modified request
        return next.handle(modifiedReq);
      })
    );
  }
}
