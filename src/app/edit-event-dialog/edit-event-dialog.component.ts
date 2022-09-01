import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SportEvent } from '../events-table/events-table.component';

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.scss']
})
export class EditEventDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sportEvent: any) { }

  //TODO - fix to show date in the edit form
  eventForm = new FormGroup({
    SportName!: new FormControl(this.sportEvent!.SportName),
    Location!: new FormControl(this.sportEvent!.Location),
    League!: new FormControl(this.sportEvent!.League),
    TeamsPlaying!: new FormControl(this.sportEvent!.TeamsPlaying),
    StartingTime!: new FormControl(this.sportEvent!.StartingTime),
    AdditionalData!: new FormControl(this.sportEvent!.AdditionalData,)
  });

  ngOnInit(): void {
    this.eventForm.setValue(this.sportEvent.sportEvent as SportEvent);
  }

  cancel() {
    this.dialogRef.close();
  }
}
