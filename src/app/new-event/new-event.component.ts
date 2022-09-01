import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  showForm = false;

  eventForm = new FormGroup({
    SportName!: new FormControl('', Validators.required),
    Location!: new FormControl('', Validators.required),
    League!: new FormControl('', Validators.required),
    TeamsPlaying!: new FormControl('', Validators.required),
    StartingTime!: new FormControl('', Validators.required),
    AdditionalData!: new FormControl('')
  });

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  openForm() {
    this.showForm = true;
  }

  submit() {
    this.eventsService.newEvent.next({ ...this.eventForm.value, StartingTime: new Date(this.eventForm.value!.StartingTime!) });
    this.showForm = false;
    this.eventForm.reset()
  }
}
