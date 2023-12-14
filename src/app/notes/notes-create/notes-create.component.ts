import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Note } from '../notes.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.scss']
})
export class NotesCreateComponent implements OnInit {

  pageInput: Note = {
    id: '',
    title: '',
    content: ''
  }

  during: any = {
    fechingNotes: false
  };

  title: string = "Add a Note"
  mode: string = "create";
  noteId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("noteId")) {
        this.title = "Edit a Note"
        this.mode = "update";
        this.noteId = paramMap.get("noteId")
        this.during.fechingNotes = true;
        this.notesService.getNote(this.noteId).subscribe(response => {
          this.during.fechingNotes = false;
          this.pageInput = {
            id: response._id,
            title: response.title,
            content: response.content
          }
        });
      } else {
        this.mode = "create";
        this.noteId = null;
      }
    });
  }

  onSaveNote() {
    this.during.fechingNotes = true
    if (this.mode == "create") {
      this.notesService.addNote(this.pageInput.title, this.pageInput.content)
    } else {
      this.notesService.updateNote(this.noteId, this.pageInput.title, this.pageInput.content)
    }
  }
}
