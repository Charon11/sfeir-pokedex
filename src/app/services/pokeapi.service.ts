import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private _http: HttpClient) { }

  getPokemons(): Observable<Array<any>> {
    const pokes: Observable<any>[] = [];
    for (let i = 1; i <= 151; i++) {
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
