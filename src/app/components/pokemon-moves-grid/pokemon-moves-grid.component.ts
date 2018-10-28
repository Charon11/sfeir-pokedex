import {Component, Input, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {flatMap, tap} from 'rxjs/operators';
import {PokeapiService} from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-moves-grid',
  templateUrl: './pokemon-moves-grid.component.html',
  styleUrls: ['./pokemon-moves-grid.component.css'],
})
export class PokemonMovesGridComponent implements OnInit {

  private _moves: any[];
  private readonly _columns: string[];

  @Input()
  set moves(data: any[]) {
    if (data) {
      forkJoin(data.map(move => this.pokeapi.callUrl(move.move.url)))
        .pipe(
          tap(moves => this._moves = moves),
          flatMap(() =>
            forkJoin(this._moves.map((move: any) =>
              forkJoin(this.pokeapi.callUrl(move.damage_class.url),
                this.pokeapi.callUrl(move.type.url))))),
          tap(moveData => this._moves.forEach((move, index) => {
            move.damage_class.details = moveData[index][0];
            move.type.details = moveData[index][1];
          })),
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
    this._columns = ['nom', 'move_type', 'damage_type', 'puissance'];
  }

  ngOnInit() {
  }

}
