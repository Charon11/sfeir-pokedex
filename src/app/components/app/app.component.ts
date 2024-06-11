import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SwUpdate} from '@angular/service-worker';
import {Capacitor} from "@capacitor/core";
import {Router} from "@angular/router";
import {AzureNotificationService} from "../../services/azure-notification.service";
import {tap} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public token = "";

  constructor(private translate: TranslateService,
              private swUpdate: SwUpdate,
              private router: Router,
              private azureNotification: AzureNotificationService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('fr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('fr');

    this.azureNotification.addListeners().then();

  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.checkForUpdate().then((available) => {
        if (available) {
          if (confirm('New version available. Load New Version?')) {
            window.location.reload();
          }
        }
      });
    }


    this.azureNotification.notificationReceived
      .pipe(
        tap(event => console.log("notificationReceived: ", {event}))
      ).subscribe();
    this.azureNotification.notificationActionPerformed
      .pipe(
        tap(event => console.log("notificationActionPerformed: ", {event}))
      ).subscribe(event => {
      if (event !== null) this.router.navigate(['pokedex'])
    });
    this.azureNotification.tokenReceived
      .pipe(
        tap(event => console.log("tokenReceived: ", {event}))
      ).subscribe();

    this.azureNotification.registerNotifications("pokemon").then();

  }

  get platform() {
    return Capacitor.getPlatform();
  }
}
