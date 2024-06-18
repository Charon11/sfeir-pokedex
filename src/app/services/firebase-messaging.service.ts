import {Injectable} from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token, DeliveredNotifications,
} from '@capacitor/push-notifications';
import {BehaviorSubject, from, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  private tokenReceivedSubject: Subject<Token> = new Subject<Token>();
  private notificationReceivedSubject: Subject<PushNotificationSchema> = new Subject<PushNotificationSchema>();
  private notificationActionPerformedSubject: BehaviorSubject<ActionPerformed> = new BehaviorSubject<ActionPerformed>(null);

  get tokenReceived(): Observable<Token> {
    return this.tokenReceivedSubject.asObservable();
  }

  get notificationReceived(): Observable<PushNotificationSchema> {
    return this.notificationReceivedSubject.asObservable();
  }

  get notificationActionPerformed(): Observable<ActionPerformed> {
    return this.notificationActionPerformedSubject.asObservable();
  }

  checkPermissions() {
    return from(PushNotifications.checkPermissions()).pipe(map(r => r.receive));
  };

  requestPermissions() {
    return from(PushNotifications.requestPermissions()).pipe(map(r => r.receive));
  };

  register() {
    return from(PushNotifications.register());
  };


  getDeliveredNotifications() {
    return from(PushNotifications.getDeliveredNotifications()).pipe(map(r => r.notifications));
  };

  removeDeliveredNotification = (notification: DeliveredNotifications) => {
    return from(PushNotifications.removeDeliveredNotifications(notification));
  };


  removeAllDeliveredNotifications() {
    return from(PushNotifications.removeAllDeliveredNotifications());
  };

  subscribeToTopic = (topic: string) => {
    return from(PushNotifications.createChannel({id: topic, name: topic}));
  };

  unsubscribeFromTopic = (topic: string) => {
    return from(PushNotifications.deleteChannel({id: topic}));
  };

  async addTokenReceivedListener() {
    await PushNotifications.addListener('registration', event => this.tokenReceivedSubject.next(event));
  };

  async addNotificationReceivedListener() {
    await PushNotifications.addListener('pushNotificationReceived', event => this.notificationReceivedSubject.next(event));
  };

  async addNotificationActionPerformedListener() {
    await PushNotifications.addListener('pushNotificationActionPerformed', event => this.notificationActionPerformedSubject.next(event));
  };

  removeAllListeners() {
    return from(PushNotifications.removeAllListeners());
  };

}
