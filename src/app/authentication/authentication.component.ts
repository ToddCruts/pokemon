import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
authenticationFormRef: any;
authObsrv: Observable<AuthResponseData>;
errMsg: string = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  isLoginMode = true;

  onSwitchAuthMode() {
      this.isLoginMode = !this.isLoginMode;
  }
  onAuthFormSubmit(formObj: NgForm) {
    if (!formObj.valid) return;
    const { email, password } = formObj.value
    if (this.isLoginMode) {
      this.authService.signIn(email, password).subscribe(
        res => {
          console.log("Auth Sign In Response:", res);
          if (this.errMsg) this.errMsg = null;
        },
        err => {
          console.error("Auth Res Error:", err);
          this.errMsg = err.message;
        }
      );
      this.authObsrv = this.authService.signIn(email, password);
    } else {
      // Sign Up Logic
      this.authService.signUp(email, password).subscribe(
        res => {
          console.log("Auth Response Success:", res);
          if (this.errMsg) this.errMsg = null;
        },
        err => {
          console.error("Auth Res Error:", err);
          this.errMsg = err.message;
        }
      );
      this.authObsrv = this.authService.signUp(email, password);
    }
    this.authObsrv.subscribe(
      (res) => {
        console.log('Auth Res Success:', res);
        if (this.errMsg) this.errMsg = null;
        this.router.navigate(['collection']);
      },
      (err) => {
        console.error('Auth Res Error:', err);
        this.errMsg = err.message;
      }
    );
    console.log('Form Values:', formObj.value);
    formObj.reset();
}
}
