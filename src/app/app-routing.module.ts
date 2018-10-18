import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokedexComponent} from './components/pokedex/pokedex.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [

  { path: 'pokedex', component: PokedexComponent},
  { path: '', component: HomeComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
