import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private _http: HttpClient) { }

  getPokemons(): Observable<Array<any>> {
    return this.getRangePokemons(1, 30);
  }

  getRangePokemons(start: number, end: number): Observable<Array<any>> {
    const pokes: Observable<any>[] = [];
    for (let i = start; i <= end; i++) {
      pokes.push(this.getPokemon(i));
    }
    return forkJoin(pokes);
  }

  getPokemon(id: number): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/pokemon/${id.toString()}/`);
  }

  getPokemonByName(name: string): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  }

  callUrl(url: string) {
    return this._http.get(url);
  }
}
