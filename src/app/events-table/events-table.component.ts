import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EditEventDialogComponent } from '../edit-event-dialog/edit-event-dialog.component';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EventsTableComponent implements OnInit, OnDestroy {

  columnsDefinition = ['SportName', 'Location', 'League', 'TeamsPlaying', 'StartingTime'];
  columnsDefinitionWithExpand = [...this.columnsDefinition, 'expand'];

  //TODO- should be move to json
  sportEvents: SportEvent[] = [{
    SportName: 'Football',
    Location: 'Beer Sheva',
    League: 'Israeli Premier League',
    TeamsPlaying: 'Hapoel Beer Sheva vs Maccabi Haifa',
    StartingTime: new Date('2022-08-28T19:10:00Z'),
    AdditionalData: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  {
    SportName: 'ESports',
    Location: 'Online',
    League: 'Overwatch League',
    TeamsPlaying: 'Vancouver Titans vs Washington Justice',
    StartingTime: new Date('2022-09-02T13:00:00Z'),
    AdditionalData: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  {
    SportName: 'Hokey',
    Location: 'Eilat',
    League: 'Israeli League',
    TeamsPlaying: 'Rishon Devils vs Maccabi Metulla Eggenbreggers',
    StartingTime: new Date('2022-02-03T13:00:00Z'),
    AdditionalData: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  }]

  expandedEvent: SportEvent | null | undefined;
  eventsSub?: Subscription;
  dialogSub?: Subscription;

  @ViewChild(MatTable) table!: MatTable<SportEvent>;

  constructor(private eventsService: EventsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sortData();
    this.eventsSub = this.eventsService.newEvent.subscribe((event) => {
      this.sportEvents.push(event);
      this.sortData();
      this.table!.renderRows();
    })
  }

  ngOnDestroy(): void {
    this.eventsSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
  }
  sortData() {
    this.sportEvents = this.sportEvents.sort((a, b) => Number(a.StartingTime) - Number(b.StartingTime));
  }

  removeEvent(index: number) {
    this.sportEvents.splice(index, 1);
    this.table.renderRows();
  }

  editEvent(index: number, event: SportEvent) {
    const dialogRef = this.dialog.open(EditEventDialogComponent, {
      width: '350px',
      height: '600px',
      data: { sportEvent: event },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sportEvents.push({ ...result, StartingTime: new Date(result.StartingTime) });
        this.sportEvents.splice(index, 1);

        this.sortData();

        this.table.renderRows();
      }
    });
  }

  closeEvent(date: Date) {
    let toDate = new Date(date);
    const now = Date.now();

    return (now - toDate.getTime()) >= (-60 * 60 * 1000) && (now - toDate.getTime()) < 0;
  }

  oldEvent(date: Date) {
    let toDate = new Date(date);
    const now = Date.now();
    return (now - toDate.getTime()) > 0;
  }

}

export interface SportEvent {
  SportName: string;
  Location: string;
  League: string;
  TeamsPlaying: string;
  StartingTime: Date;
  AdditionalData: string;
}
