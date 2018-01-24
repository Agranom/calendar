import {Component, Inject, OnInit, Optional, PLATFORM_ID} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {ExtendedCalendarEvent} from './models/calendar-event';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    viewDate = new Date();
    events = [];

    constructor(@Optional() @Inject(REQUEST) private request, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.events = this.request['body'].map(mapper);
            console.log(this.events);
        } else {
            console.log('ss');
        }
    }

    getColor(hex: string, opacity: number = 1): string {
        const bigInt = this.toInt(hex);
        const r = (bigInt >> 16) & 255;
        const g = (bigInt >> 8) & 255;
        const b = bigInt & 255;

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    private toInt(hex: string): number {
        return parseInt(hex.replace('#', ''), 16);
    }

}

function mapper(obj): ExtendedCalendarEvent {
    return <ExtendedCalendarEvent>{
        title: obj['title'],
        description: obj['description'],
        done: obj['done'],
        color: obj['color'],
        start: new Date(obj['start']),
        end: new Date(obj['end']),
        isCustomEvent: obj['isCustomEvent'],
        groupName: obj['groupName']
    };
}
