import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CollectionComponent } from './collection/collection.component';
import { SwapComponent } from './swap/swap.component';
import { SearchComponent } from './search/search.component';
import { ModelComponent } from './model/model.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AuthenticationComponent,
    CollectionComponent,
    SwapComponent,
    SearchComponent,
    ModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
