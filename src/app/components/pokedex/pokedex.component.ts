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


  constructor(private _pokeApiService: PokeapiService,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog) {
    this.spinner.show()
    this._pokemons = this._pokeApiService.getPokemons().pipe(map(res => {
      this.spinner.hide()
      return res;
    }));
  }

  ngOnInit() {
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
