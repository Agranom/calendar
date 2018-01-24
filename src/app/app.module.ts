import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {CalendarModule} from 'angular-calendar';
import {ClipTextPipe} from './clip-text.pipe';
import {HttpClientModule} from '@angular/common/http';
import {EventService} from './event.service';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {EventHeaderComponent} from './event-header/event-header.component';


@NgModule({
    declarations: [
        AppComponent,
        ClipTextPipe,
        EventHeaderComponent
    ],
    imports: [
        CommonModule,
        CalendarModule.forRoot(),
        HttpClientModule,
        BrowserModule.withServerTransition({appId: 'calendar'}),
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        EventService,
        // {provide: REQUEST, useFactory: () => REQUEST}
    ]
})
export class AppModule {
}
