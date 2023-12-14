import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Note } from '../notes.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  private notesSub!: Subscription;

  notes: Note[] = [];

  during: any = {
    fechingNotes: false
  };

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.notesService.getAllNotes();
    this.notesSub = this.notesService.getAllNoteUpdated().subscribe((response: Note[]) => {
      this.during.fechingNotes = true;
      this.notes = response;
    });
  }

  onDeleteNote(noteId: string | null) {
    this.notesService.deletedNote(noteId || '')
  }

  ngOnDestroy() {
    this.notesSub.unsubscribe();
  }
}
