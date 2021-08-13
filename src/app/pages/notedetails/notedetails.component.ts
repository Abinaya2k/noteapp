import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notedetails',
  templateUrl: './notedetails.component.html',
  styleUrls: ['./notedetails.component.scss']
})
export class NotedetailsComponent implements OnInit {
  note:Note;
  noteId:number;
  new:boolean;
  constructor(private notesservice:NotesService ,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((param:Params)=>{
      this.note=new Note();
      if(param.id){
        this.note=this.notesservice.get(param.id);
        this.noteId=param.id;
        this.new=false;

      }else{
        this.new=true;
      }
    })

  }
  onsubmit(form:NgForm){
    if(this.new){
      this.notesservice.add(form.value);
      this.router.navigateByUrl('/');
    }else{
      this.notesservice.update(this.noteId,form.value.title,form.value.body);
      this.router.navigateByUrl('/');
    }

  }

  cancel(){
    this.router.navigateByUrl('/');
  }

}
