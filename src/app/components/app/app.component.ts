import {Component, OnInit} from '@angular/core';
import {PokeapiService} from '../../services/pokeapi.service';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _pokeApiService: PokeapiService,
              translate: TranslateService,
              private swUpdate: SwUpdate) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('fr');
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if (confirm('New version available. Load New Version?')) {

          window.location.reload();
        }
      });
    }
  }

}
