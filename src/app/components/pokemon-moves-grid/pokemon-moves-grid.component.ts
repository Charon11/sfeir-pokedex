import {Component, Input, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {flatMap, tap} from 'rxjs/operators';
import {PokeapiService} from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-moves-grid',
  templateUrl: './pokemon-moves-grid.component.html',
  styles: [],
})
export class PokemonMovesGridComponent implements OnInit {

  private _moves: any[];
  private _columns: string[];

  @Input()
  set moves(data: any[]) {
    if (data) {
      // this._moves = data;
      data.map(move => {
        console.log(move);
        return move.move.url;
      }).filter(move => !move);

      forkJoin(data.map(move => this.pokeapi.callUrl(move.move.url)))
        .pipe(
          tap(moves => this._moves = moves),
          flatMap(() => forkJoin(this._moves.map((move: any) => this.pokeapi.callUrl(move.damage_class.url)))),
          tap(damageClasses => this._moves.forEach((move, index) => move.damage_class.details = damageClasses[index])),
        )
        .subscribe();
    }
  }

  get moves(): any[] {
    return this._moves;
  }

  get columns(): string[] {
    return this._columns;
  }

  constructor(private pokeapi: PokeapiService) {
    this._columns = ['nom', 'type', 'puissance'];
  }

  ngOnInit() {
  }

}
