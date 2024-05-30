import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PokeapiService} from '../../services/pokeapi.service';
import {PokemonDetailsDialogComponent} from '../pokemon-details-dialog/pokemon-details-dialog.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Capacitor} from "@capacitor/core";
import {FirebaseMessagingService} from "../../services/firebase-messaging.service";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit, OnDestroy {

  private _pokemonsArray: Array<any> = [];
  private _currentOffset = 0;
  private notificationAction: Subscription;


  constructor(private _pokeApiService: PokeapiService,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              private firebaseMessagingService: FirebaseMessagingService,
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this._pokeApiService.getPokemonByRange(this._currentOffset).subscribe(res => {
      res.forEach(pokemon => this._pokemonsArray.push(pokemon));
      this._currentOffset = this._pokemonsArray.length;
      this.spinner.hide();
      this.notificationAction = this.firebaseMessagingService.notificationActionPerformed.subscribe(event => {
        if (event !== null) {
          const pokemon = event.notification.data['pokemon']
          if (pokemon) this.onCardClick({name: pokemon})
          this.firebaseMessagingService.removeAllDeliveredNotifications().pipe(tap(_ => 'removeAllDeliveredNotifications')).subscribe().unsubscribe();
        }
      });
    });
  }

  onScroll() {
    this.loadPokemon();
  }

  get pokemons() {
    return this._pokemonsArray;
  }

  private loadPokemon() {
    this._pokeApiService.getPokemonByRange(this._currentOffset).subscribe(res => {
      res.forEach(pokemon => this._pokemonsArray.push(pokemon));
      this._currentOffset = this._pokemonsArray.length;
      this.spinner.hide();
    });
  }

  onCardClick(pokemon: any) {
    const dialogRef = this.dialog.open(PokemonDetailsDialogComponent, {
      width: '90%'
    });
    dialogRef.componentInstance.pokemonName = pokemon.name;
  }

  get platform() {
    return Capacitor.getPlatform();
  }

  ngOnDestroy(): void {
    this.notificationAction.unsubscribe();
  }
}
