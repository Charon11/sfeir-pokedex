import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styles: []
})
export class PokemonComponent implements OnInit {

  @Input('pokemon') private _pokemon: any;

  constructor(private _sanitizer: DomSanitizer) {

  }

  ngOnInit() {
  }

  public get photoUrl() {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.pokemon.sprites.front_default})`);
  }


  get pokemon() {
    return this._pokemon;
  }
}
