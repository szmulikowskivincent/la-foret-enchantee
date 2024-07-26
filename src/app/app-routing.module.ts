import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForestComponent } from './components/forest/forest.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HomeComponent } from './components/home/home.component';
import { MonstersComponent } from './components/monsters/monsters.component';
import { MountsComponent } from './components/mounts/mounts.component';
import { WeaponsComponent } from './components/weapons/weapons.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forest', component: ForestComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'mounts', component: MountsComponent },
  { path: 'monsters', component: MonstersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

