import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {

  private readonly _urlCache: {[key: string]: Observable<any>};

  constructor(private _http: HttpClient) {
    this._urlCache = {};
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
    return this.callUrl(`https://pokeapi.co/api/v2/pokemon/${id.toString()}/`);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.callUrl(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  }

  getPokemonGeneration(pokemonNumber: number): number {
    let generation = 1; // Count generation while iterating on array
    for (const pokemonCount of environment.pokemonCountByGeneration) {
      if (pokemonNumber <= pokemonCount) {
        return generation;
      }
      generation += 1;
    }
    // If no generation was returned yet, return generation 0 (generation undetermined)
    return 0;
  }

  callUrl(url: string): Observable<any> {
    if (!this._urlCache[url]) {
      this._urlCache[url] = this._http.get<any>(url).pipe(shareReplay());
    }
    return this._urlCache[url];
  }
}
