import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SwUpdate} from '@angular/service-worker';
import {Capacitor} from "@capacitor/core";
import {FirebaseMessagingService} from "../../services/firebase-messaging.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Badge} from "@capawesome/capacitor-badge";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public token = "";

  constructor(private translate: TranslateService,
              private swUpdate: SwUpdate,
              private firebaseMessagingService: FirebaseMessagingService,
              private router: Router,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('fr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('fr');

    this.firebaseMessagingService.addTokenReceivedListener();
    this.firebaseMessagingService.addNotificationReceivedListener();
    this.firebaseMessagingService.addNotificationActionPerformedListener();
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

    this.firebaseMessagingService.notificationReceived
      .pipe(
        tap(event => console.log("notificationReceived: ", {event}))
      ).subscribe(event => {
      if (event !== null) {
        console.log("notificationReceived")
        const badge = event.notification.data['badge']
        if (badge) {
          console.log("Badge found, set to ", badge)
          Badge.set({count: +badge}).then();
        } else {
          this.firebaseMessagingService.getDeliveredNotifications().subscribe(n => {
            console.log("Badge not found, set to ", n.length)
            Badge.set({count: n.length}).then()
          });
        }
      }
    });
    this.firebaseMessagingService.notificationActionPerformed
      .pipe(
        tap(event => console.log("notificationActionPerformed: ", {event}))
      ).subscribe(event => {
      if (event !== null) this.router.navigate(['pokedex'])
    });
    this.firebaseMessagingService.tokenReceived
      .pipe(
        tap(event => console.log("tokenReceived: ", {event}))
      ).subscribe();
    this.firebaseMessagingService.subscribeToTopic('pokemon').subscribe(_ => console.log('subscribeTo pokemon'));

    this.firebaseMessagingService.requestPermissions().subscribe();
    this.firebaseMessagingService.getToken().subscribe(token => console.log(token));
  }

  get platform() {
    return Capacitor.getPlatform();
  }
}
