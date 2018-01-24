import {Inject, Injectable} from '@angular/core';
import {Request} from 'express';


@Injectable()
export class EventService {

    constructor(@Inject('testReq') request: any) {
    }
}
