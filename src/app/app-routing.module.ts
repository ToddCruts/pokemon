import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CollectionComponent } from './collection/collection.component';
import { SearchComponent } from './search/search.component';
import { SwapComponent } from './swap/swap.component';

const routes: Routes = [
 // { path: "", redirectTo: "/collection", pathMatch: "full" },
  { path: 'collection', component: CollectionComponent },
  { path: 'swap', component: SwapComponent },
  { path: 'search', component: SearchComponent },
  { path: 'auth', component: AuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
