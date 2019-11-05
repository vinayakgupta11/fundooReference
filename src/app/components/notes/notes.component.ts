

import { Component, OnInit, OnChanges } from '@angular/core';
import { NoteService } from '../../service/note/note.service'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnChanges {
  //Bifurcate the all cards into Pinned and unpiined and assign it respectively.
  pinNotes = [];
  unPinNotes = [];
  cardData = [];

  constructor(private service: NoteService) { }

  ngOnInit() {
    this.getAllCard();
  }
  /**
   * @description get the new card and push it based on pin or unpin.
   * 
   * @param $event card
   */
  getNewNote($event) {
    this.cardData.push($event);
    if ($event["isArchived"] == false) {
      if ($event["isPined"] == false) {
        this.unPinNotes.push($event);
      }
      else
        this.pinNotes.push($event);
    }
  }

  ngOnChanges() {
    console.log("Onchanges");
  }
  /**
   * @description To get all the cards before the component display.
   */
  getAllCard() {
    this.service.getnotes().subscribe(data => {
      this.cardData = data["data"]["data"];
      // console.log(this.cardData,'card');

      // To remove the deleted cards and to sort the cards into pined and unpined.
      this.check();
      return
    })
  }
  /**
   * @description To remove the deleted cards and to sort the cards into pined and unpined.
   */
  check() {
    this.cardData.forEach(element => {
      if (element["isDeleted"] == false && element["isArchived"] == false) {
        if (element["isPined"] == false) {
          this.unPinNotes.push(element);
        }
        else
          this.pinNotes.push(element);
      }
    });
  }
}
