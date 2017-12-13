import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  viewDate = new Date();
  events = [
    {
      start: new Date(),
      end: new Date(),
      title: 'Hello',
      color: '#00ff00'
    }
  ];

  constructor() {
  }

  ngOnInit() {

  }

}
