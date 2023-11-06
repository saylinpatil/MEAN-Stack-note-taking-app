import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesCreateComponent } from './notes/notes-create/notes-create.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';

const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'create', component: NotesCreateComponent },
  { path: 'update/:noteId', component: NotesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
