import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForestComponent } from './components/forest/forest.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { WeaponsComponent } from './components/weapons/weapons.component';
import { MountsComponent } from './components/mounts/mounts.component';
import { MonstersComponent } from './components/monsters/monsters.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChoixComponent } from './components/choix/choix.component';
import { ZoneDeJeuComponent } from './components/zone-de-jeu/zone-de-jeu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ForestComponent,
    HeroesComponent,
    WeaponsComponent,
    MountsComponent,
    MonstersComponent,
    HomeComponent,
    FooterComponent,
    ChoixComponent,
    ZoneDeJeuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
