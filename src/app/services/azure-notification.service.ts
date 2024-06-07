import {Injectable} from '@angular/core';
import { Device } from '@capacitor/device';
import {ActionPerformed, PushNotifications, PushNotificationSchema} from '@capacitor/push-notifications';
import {AzureNotificationHubs, Token} from '@jonz94/capacitor-azure-notification-hubs';
import {BehaviorSubject, from, Observable, Subject} from "rxjs";
import {LocalNotifications, ActionPerformed as LocalActionPerformed} from "@capacitor/local-notifications";

@Injectable({
  providedIn: 'root'
})
export class AzureNotificationService {

  private tokenReceivedSubject: Subject<Token> = new Subject<Token>();
  private notificationReceivedSubject: Subject<PushNotificationSchema> = new Subject<PushNotificationSchema>();
  private notificationActionPerformedSubject: BehaviorSubject<ActionPerformed> = new BehaviorSubject<ActionPerformed>(null);
  private localNotificationActionPerformedSubject: BehaviorSubject<LocalActionPerformed> = new BehaviorSubject<LocalActionPerformed>(null);

  get tokenReceived(): Observable<Token> {
    return this.tokenReceivedSubject.asObservable();
  }

  get notificationReceived(): Observable<PushNotificationSchema> {
    return this.notificationReceivedSubject.asObservable();
  }

  get notificationActionPerformed(): Observable<ActionPerformed> {
    return this.notificationActionPerformedSubject.asObservable();
  }

  get localNotificationActionPerformed(): Observable<LocalActionPerformed> {
    return this.localNotificationActionPerformedSubject.asObservable();
  }

  constructor() {}

   async addListeners()  {
    await AzureNotificationHubs.addListener('registration', token => {
      this.tokenReceivedSubject.next(token);
    });

    await AzureNotificationHubs.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener("pushNotificationReceived", notification => {
      this.notificationReceivedSubject.next(notification);
    });

    await PushNotifications.addListener("pushNotificationActionPerformed", notification => {
      this.notificationActionPerformedSubject.next(notification);
    });

     await LocalNotifications.addListener('localNotificationActionPerformed', notification => {
       this.localNotificationActionPerformedSubject.next(notification);
     });

  }

  async registerNotifications(tag: string) {
    let permissionStatus = await PushNotifications.checkPermissions();

    /*if (permissionStatus.receive === 'granted') {
      return permissionStatus;
    }*/

    if (permissionStatus.receive === 'prompt') {
      permissionStatus = await PushNotifications.requestPermissions();
    }

    if (permissionStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    const { identifier } = await Device.getId();

    const myDeviceTag = `${identifier}-${Date.now()}`

    await AzureNotificationHubs.register({
      notificationHubName: 'pokedex',
      connectionString: 'Endpoint=sb://raif-pokedex.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=eZoHaEYQIfq0h0krx6YM8mqiRK5WK30WG5Gd5kMjcIw=',
      deviceTag: tag ?? myDeviceTag,
    });
  }

}
