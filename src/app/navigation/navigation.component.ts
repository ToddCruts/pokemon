import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/authentication.service';
import { HTTPService } from '../http/http.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  isAuthenticated = false;
  constructor(private httpService: HTTPService, private authService: AuthService) { }
  onSignOut() {
    this.authService.signOut();
  }
  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy(): void {
    this.authService.currentUser.unsubscribe();
  }
}
