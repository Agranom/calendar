import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-event-header',
    templateUrl: './event-header.component.html',
    styleUrls: ['./event-header.component.sass']
})
export class EventHeaderComponent implements OnChanges {
    @Input() event;
    styles = {};
    isAllDay = false;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['event'] && changes['event'].currentValue && changes['event'].currentValue.isCustomEvent) {
            this.styles = {
                'border': '1px solid #1c9ad6',
                'border-radius': '2px',
                'color': '#1c9ad6',
                padding: '3px'
            };
            const start = moment(changes['event'].currentValue.start);
            const end = moment(changes['event'].currentValue.end);
            this.isAllDay = start.day() === end.day() && start.hours() === 0 && end.hours() === 23 && end.minute() === 59;
        } else {
            this.styles = {};
        }
    }
}
