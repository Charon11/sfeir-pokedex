import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private _pokemonCountByGeneration = [151, 251, 386, 493, 649, 721, 807];

  constructor(private _http: HttpClient) {
  }

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

  getPokemonGeneration(pokemonNumber: number): number {
    let generation = 1; // Count generation while iterating on array
    for (const pokemonCount of this._pokemonCountByGeneration) {
      if (pokemonNumber <= pokemonCount) {
        return generation;
      }
      generation += 1;
    }
    // If no generation was returned yet, return generation 0 (generation undetermined)
    return 0;
  }

  callUrl(url: string) {
    return this._http.get(url);
  }
}
