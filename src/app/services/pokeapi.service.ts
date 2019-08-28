import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {exhaustMap, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private url = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private _http: HttpClient) {
  }


  getPokemonByRange(offset: number): Observable<Array<any>> {
    const lo = offset + environment.requestLimit > environment.limitPokemon ? {
      limit: environment.limitPokemon - offset,
      offset
    } : {
      limit: environment.requestLimit,
      offset
    };
    if (offset === environment.limitPokemon) {
      return of([]);
    } else {
      return this._http.get<any>(`${this.url}?limit=${lo.limit}&offset=${lo.offset}`)
        .pipe(
          map(res => res.results.map(r => this._http.get<any>(r.url, {headers: new HttpHeaders({'Accept-Language': 'fr'})}))),
          exhaustMap((r: Array<Observable<any>>) => forkJoin(r))
        );
    }
  }


  getPokemonByName(name: string): Observable<any> {
    return this._http.get(`${this.url}/${name}/`);
  }
}
