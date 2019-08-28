import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PokeapiService} from '../../services/pokeapi.service';
import {PokemonDetailsDialogComponent} from '../pokemon-details-dialog/pokemon-details-dialog.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  private _pokemonsArray: Array<any> = [];
  private _currentOffset = 0;


  constructor(private _pokeApiService: PokeapiService,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.spinner.show();
    this._pokeApiService.getPokemonByRange(this._currentOffset).subscribe(res => {
      res.forEach(pokemon => this._pokemonsArray.push(pokemon));
      this._currentOffset = this._pokemonsArray.length;
      this.spinner.hide();
    });
  }

  onScroll() {
    this.loadPokemon();
  }

  get pokemons() {
    return this._pokemonsArray;
  }

  private loadPokemon() {
    this._pokeApiService.getPokemonByRange(this._currentOffset).subscribe(res => {
      res.forEach(pokemon => this._pokemonsArray.push(pokemon));
      this._currentOffset = this._pokemonsArray.length;
      this.spinner.hide();
    });
  }

  onCardClick(pokemon: any) {
    const dialogRef = this.dialog.open(PokemonDetailsDialogComponent, {
      width: '90%'
    });
    dialogRef.componentInstance.pokemonName = pokemon.name;
  }

}
