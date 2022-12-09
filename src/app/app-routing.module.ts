import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { SearchComponent } from './search/search.component';
import { SwapComponent } from './swap/swap.component';

const routes: Routes = [
 // { path: "", redirectTo: "/collection", pathMatch: "full" },
  { path: 'collection', component: CollectionComponent },
  { path: 'swap', component: SwapComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
