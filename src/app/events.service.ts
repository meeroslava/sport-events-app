import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SportEvent } from './events-table/events-table.component';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  newEvent = new Subject<any>();

  constructor() { }
}
