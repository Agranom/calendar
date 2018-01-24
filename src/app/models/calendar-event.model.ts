export class CalendarEventModel {
    constructor(public id: number,
                public title: string,
                public description: string,
                public start: Date,
                public end: Date,
                public groupId: number,
                public done: boolean) {
    }
}
