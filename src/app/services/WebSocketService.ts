import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import {Capacitor} from "@capacitor/core";

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    console.log(Capacitor.getPlatform());
    if (Capacitor.getPlatform() === 'android') {
      this.socket$ = new WebSocketSubject('wss://10.0.2.2:8443/notifications-websocket');
    } else {
      this.socket$ = new WebSocketSubject('wss://localhost:8443/notifications-websocket');
    }

  }

  public sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  public getMessages() {
    return this.socket$.asObservable();
  }
}
