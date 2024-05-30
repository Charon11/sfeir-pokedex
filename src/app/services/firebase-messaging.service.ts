import {Injectable} from '@angular/core';
import {
  FirebaseMessaging,
  Notification, NotificationActionPerformedEvent,
  NotificationReceivedEvent,
  TokenReceivedEvent
} from '@capacitor-firebase/messaging';
import {BehaviorSubject, from, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  private tokenReceivedSubject: Subject<TokenReceivedEvent> = new Subject<TokenReceivedEvent>();
  private notificationReceivedSubject: Subject<NotificationReceivedEvent> = new Subject<NotificationReceivedEvent>();
  private notificationActionPerformedSubject: BehaviorSubject<NotificationActionPerformedEvent> = new BehaviorSubject<NotificationActionPerformedEvent>(null);

  get tokenReceived(): Observable<TokenReceivedEvent> {
    return this.tokenReceivedSubject.asObservable();
  }

  get notificationReceived(): Observable<NotificationReceivedEvent> {
    return this.notificationReceivedSubject.asObservable();
  }

  get notificationActionPerformed(): Observable<NotificationActionPerformedEvent> {
    return this.notificationActionPerformedSubject.asObservable();
  }

  checkPermissions() {
    return from(FirebaseMessaging.checkPermissions()).pipe(map(r => r.receive));
  };

  requestPermissions() {
    return from(FirebaseMessaging.requestPermissions()).pipe(map(r => r.receive));
  };

  getToken() {
    return from(FirebaseMessaging.getToken()).pipe(map(r => r.token));
  };

  deleteToken() {
    return from(FirebaseMessaging.deleteToken());
  };

  getDeliveredNotifications() {
    return from(FirebaseMessaging.getDeliveredNotifications()).pipe(map(r => r.notifications));
  };

  removeDeliveredNotification = (notification: Notification) => {
    return from(FirebaseMessaging.removeDeliveredNotifications({notifications: [notification]}));
  };

  removeDeliveredNotificationsByIds = (ids: String[]) => {
    return from(FirebaseMessaging.removeDeliveredNotifications({notifications: ids.map(id => <Notification>{id})}));
  };

  removeAllDeliveredNotifications() {
    return from(FirebaseMessaging.removeAllDeliveredNotifications());
  };

  subscribeToTopic = (topic: string) => {
    return from(FirebaseMessaging.subscribeToTopic({topic}));
  };

  unsubscribeFromTopic = (topic: string) => {
    return from(FirebaseMessaging.unsubscribeFromTopic({topic}));
  };

  async addTokenReceivedListener() {
    await FirebaseMessaging.addListener('tokenReceived', event => this.tokenReceivedSubject.next(event));
  };

  async addNotificationReceivedListener() {
    await FirebaseMessaging.addListener('notificationReceived', event => this.notificationReceivedSubject.next(event));
  };

  async addNotificationActionPerformedListener() {
    await FirebaseMessaging.addListener('notificationActionPerformed', event => this.notificationActionPerformedSubject.next(event));
  };

  removeAllListeners() {
    return from(FirebaseMessaging.removeAllListeners());
  };

}
