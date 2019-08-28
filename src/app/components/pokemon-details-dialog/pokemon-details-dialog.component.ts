import { Component, OnInit } from '@angular/core';
import {PokeapiService} from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-details-dialog',
  templateUrl: './pokemon-details-dialog.component.html',
  styleUrls: ['./pokemon-details-dialog.component.css']
})
export class PokemonDetailsDialogComponent implements OnInit {

  public pokemonName: string;
  private _pokemon: any;
  constructor(private pokeapi: PokeapiService) {

  }

  ngOnInit() {
    this.pokeapi.getPokemonByName(this.pokemonName).subscribe(data => {
      this._pokemon = data;
    });
  }

  get pokemon() {
    return this._pokemon;
  }

}
