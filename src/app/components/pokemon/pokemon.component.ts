import {Component, Input, OnInit} from '@angular/core';
import {PokeapiService} from '../../services/pokeapi.service';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styles: []
})
export class PokemonComponent implements OnInit {

  @Input('pokemon') private _pokemon: any;

  constructor(private _sanitizer: DomSanitizer,
              private _pokeapiService: PokeapiService) {

  }

  ngOnInit() {
    // this._pokeapiService.getPokemonByUrl(this.url).subscribe(value => this._pokemon = value);
  }

  public get photoUrl() {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.pokemon.sprites.front_default})`);
  }


  get pokemon() {
    return this._pokemon;
  }

  get generation(): number {
    return this._pokeapiService.getPokemonGeneration(this._pokemon.id);
  }
}
