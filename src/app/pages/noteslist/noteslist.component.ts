import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-noteslist',
  templateUrl: './noteslist.component.html',
  styleUrls: ['./noteslist.component.scss']

})
export class NoteslistComponent implements OnInit {
  notes:Note[]=new Array<Note>();
  filteredNotes:Note[]=new Array<Note>();
  filterquery="";
  constructor(private notesService:NotesService) { }

  ngOnInit(): void {
    this.notes= this.notesService.getall();
    //this.filteredNotes=this.notesService.getall();
    this.filter(' ');

  }

  deletenote(note:Note){
    let noteid=this.notesService.getid(note);
    this.notesService.delete(noteid);
    this.filter(this.filterquery);
  }
  generatenotesurl(note:Note){
    let noteid=this.notesService.getid(note);
    return noteid.toString();
  }

  filter(query:string){
    query=query.toLowerCase().trim();
    let allresult:Note[]=new Array<Note>();
    let terms:string[]=query.split(" ");
    terms=this.removeDuplicates(terms);
    terms.forEach(term=>{
      let results:Note[]=this.reveleantnotes(term);
      allresult=[...allresult,...results];
    })

    let uniqueresult=this.removeDuplicates(allresult);
    this.filteredNotes=uniqueresult;

    this.sortbyrelevancy(allresult);




  }

  removeDuplicates(arr:Array<any>):Array<any>{
    let uniqueresult:Set<any>=new Set<any>();
    arr.forEach(e=> uniqueresult.add(e))
    return Array.from(uniqueresult);
  }
  reveleantnotes(query:string):Array<Note>{
    query=query.toLowerCase().trim();
    let revelevantnotes=this.notes.filter(note => {
      if(note.title && note.title.toLowerCase().includes(query)){
        return true;
      }
      if(note.body && note.body.toLowerCase().includes(query)){
        return true;
      }
      return false;
    })
    return revelevantnotes;

  }

  sortbyrelevancy(searchresult:Note[]){
    let notecount:Object={};

    searchresult.forEach(note=>{
      let noteid=this.notesService.getid(note);
      if(notecount[noteid]){
        notecount[noteid]+=1;

      }else{
        notecount[noteid]=1;
      }
    })

    this.filteredNotes=this.filteredNotes.sort((a:Note,b:Note)=>{
      let aid=this.notesService.getid(a);
      let bid=this.notesService.getid(b);
      let acount=notecount[aid];
      let bcount=notecount[bid];
      return bcount-acount;
    })
  }

}
