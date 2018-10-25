import { Component, OnInit } from '@angular/core';
import {PokeapiService} from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-details-dialog',
  templateUrl: './pokemon-details-dialog.component.html',
  styleUrls: ['./pokemon-details-dialog.component.css']
})
export class PokemonDetailsDialogComponent implements OnInit {
  audio;
  public pokemonName: string;
  private _pokemon: any;
  constructor(private pokeapi: PokeapiService) {

  }

  ngOnInit() {
    this.pokeapi.getPokemonByName(this.pokemonName).subscribe(data => {
      this._pokemon = data;
      this.audio = new Audio();
      this.audio.src = 'https://pokemoncries.com/cries-old/' + this._pokemon.id + '.mp3';
      this.audio.load();
      this.audio.play();
      // this._pokemon.moves.forEach(d => this.pokeapi.callUrl(d.move.url).subscribe());
    });
  }

  get pokemon() {
    return this._pokemon;
  }

}
