import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './pages/mainlayout/mainlayout.component';
import { NotedetailsComponent } from './pages/notedetails/notedetails.component';
import { NoteslistComponent } from './pages/noteslist/noteslist.component';

const routes: Routes = [
  {path:'',component:MainlayoutComponent,children:[
    {path:'',component:NoteslistComponent},
    {path:'new',component:NotedetailsComponent},
    {path:':id',component:NotedetailsComponent}


  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
