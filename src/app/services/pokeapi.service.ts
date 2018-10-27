import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
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

  callUrl(url: string): Observable<any> {
    if (!this._urlCache[url]) {
      this._urlCache[url] = this._http.get<any>(url).pipe(shareReplay());
    }
    return this._urlCache[url];
  }
  
  getPokemonSpecies(url: string): Observable<any> {
    return this.callUrl(url);
  }

  getPokemonGeneration(url: string): Observable<string> {
    return this.getPokemonSpecies(url).pipe(
      map (({ generation })  => {
        const regex = /https:\/\/pokeapi\.co\/api\/v2\/generation\/(\d*)\//;
          return (generation.url + '').match(regex)[1];
        }
      )
    );
  }
}
