import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PokeapiService} from '../../services/pokeapi.service';
import {map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material';
import {PokemonDetailsDialogComponent} from '../pokemon-details-dialog/pokemon-details-dialog.component';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _pokemons: Observable<Array<any>>;

  constructor(private _pokeApiService: PokeapiService,
              translate: TranslateService,
              private swUpdate: SwUpdate,
              private dialog: MatDialog) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('fr');
    this._pokemons = this._pokeApiService.getPokemons();
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if (confirm('New version available. Load New Version?')) {

          window.location.reload();
        }
      });
    }
  }

  get pokemons() {
    return this._pokemons;
  }

  onCardClick(pokemon: any) {
    const dialogRef = this.dialog.open(PokemonDetailsDialogComponent, {
      width: '90%'
    });
    dialogRef.componentInstance.pokemonName = pokemon.name;
  }

}
