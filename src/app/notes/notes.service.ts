import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Note } from './notes.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = []
  private noteUpdated = new Subject<Note[]>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAllNoteUpdated() {
    return this.noteUpdated.asObservable();
  }

  addNote(title: string, content: string) {
    const input: Note = {
      id: '',
      title: title,
      content: content
    }

    this.http.post<{ message: string, noteId: string }>("http://localhost:3000/api/notes", input).subscribe(response => {
      input.id = response.noteId;
      this.notes.push(input);
      this.noteUpdated.next([...this.notes]);
      this.router.navigate(["/"]);
    })
  }

  getAllNotes() {
    this.http.get<{ message: string, notes: any }>("http://localhost:3000/api/notes")
      .pipe(map((response) => {
        return response.notes.map((note: { _id: any, title: any, content: any }) => {
          return {
            id: note._id,
            title: note.title,
            content: note.content
          };
        });
      })).subscribe(tranfirmResponse => {
        this.notes = tranfirmResponse;
        this.noteUpdated.next([...this.notes]);
      })
  }

  getNote(noteId: string | null) {
    return this.http.get<{ _id: string, title: string, content: string }>("http://localhost:3000/api/notes/" + noteId);
  }

  updateNote(id: string | null, title: string, content: string) {
    const input: Note = {
      id: id || '',
      title: title,
      content: content
    }

    this.http.put("http://localhost:3000/api/notes/" + id, input).subscribe(response => {
      const updatedNotes = [...this.notes];
      const indexOfOldNote = updatedNotes.findIndex(element => element.id == input.id);
      updatedNotes[indexOfOldNote] = input;
      this.noteUpdated.next([...this.notes]);
      this.router.navigate(["/"]);
    })
  }

  deletedNote(noteId: string | null) {
    this.http.delete("http://localhost:3000/api/notes/" + noteId).subscribe(() => {
      const updatedNotes = this.notes.filter(element => element.id !== noteId);
      this.notes = updatedNotes;
      this.noteUpdated.next([...this.notes]);
    })
  }

}
