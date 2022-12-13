import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, exhaustMap, take, tap } from "rxjs";
import { User } from "./User.model";
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
const AUTH_API_KEY = "AIzaSyA0WfJpkiV1qg3DD2N0eeQunydq0uISO08"
const SIGN_UP_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser = new BehaviorSubject<User>(null);
  userToken: string = null;
  constructor(private http: HttpClient, private authService: AuthService, private collectionService: CollectionService, private router: Router) {}
  signIn(email: string, password: string){
    return this.http.post<AuthResponseData>(
      SIGN_IN_URL + AUTH_API_KEY,
      {
      email,
      password,
      returnSecureToken: true,
      })
      .pipe(
        tap(res => {
          const { email, localId, idToken, expiresIn} = res;
          this.handleAuth (email, localId, idToken, +expiresIn);
        })
      );
  }
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(SIGN_UP_URL + AUTH_API_KEY, {
      email,
      password,
      returnSecureToken: true
    })
    .pipe(
      tap(res => {
        const { email, localId, idToken, expiresIn} = res;
        this.handleAuth (email, localId, idToken, +expiresIn);
      })
    );
  }
  signOut() {
    this.currentUser.next(null);
    this.router.navigate(['auth']);
}
  handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    // Create Expiration Date for Token
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);

    // Create a new user based on the info passed in the form and emit that user
    const formUser = new User(email, userId, token, expDate);
    this.currentUser.next(formUser);

    // Save the new user in localStorage
    localStorage.setItem("userData", JSON.stringify(formUser));
  }
  fetchMonsFromFirebase() {
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user);
        return this.http
          .get(this.firebaseRootURL, {
            params: new HttpParams().set('auth', user.token),
          })
          .pipe(
            tap((pokemon: Pokemon[]) => {
              this.collectionService.setPokemon(pokemon);
            })
          );
      })
    );
  }
}
