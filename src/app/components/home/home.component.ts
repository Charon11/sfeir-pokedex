import { Component, OnInit } from '@angular/core';
import {Capacitor} from "@capacitor/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get platform() {
    return Capacitor.getPlatform();
  }
}
