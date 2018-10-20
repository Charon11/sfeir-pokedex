import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {PokeapiService} from '../../services/pokeapi.service';
import {PokemonDetailsDialogComponent} from '../pokemon-details-dialog/pokemon-details-dialog.component';
import {map} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  private _pokemons: Observable<Array<any>>;
  private _pokemonsArray: Array<any> = [];


  constructor(private _pokeApiService: PokeapiService,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.spinner.show();
    this._pokeApiService.getPokemons().subscribe(res => {
      res.forEach(pokemon => this._pokemonsArray.push(pokemon));
      this.spinner.hide();
    });
  }

  onScroll() {
    if ((this._pokemonsArray.length + 31) >= 151) {
      this._pokeApiService.getRangePokemons(this._pokemonsArray.length + 1, 151)
        .subscribe(res => res.forEach(pokemon => this._pokemonsArray.push(pokemon)));
    } else {
      this._pokeApiService.getRangePokemons(this._pokemonsArray.length + 1, this._pokemonsArray.length + 31)
        .subscribe(res => res.forEach(pokemon => this._pokemonsArray.push(pokemon)));;
    }
  }

  get pokemons() {
    return this._pokemonsArray;
  }

  onCardClick(pokemon: any) {
    const dialogRef = this.dialog.open(PokemonDetailsDialogComponent, {
      width: '90%'
    });
    dialogRef.componentInstance.pokemonName = pokemon.name;
  }

}
