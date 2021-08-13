import { AfterViewInit, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { Component, OnInit,ViewChild,Input } from '@angular/core';

@Component({
  selector: 'app-notecard',
  templateUrl: './notecard.component.html',
  styleUrls: ['./notecard.component.scss']
})
export class NotecardComponent implements OnInit,AfterViewInit {
  @Input() title:string;
  @Input() body:string;
  @Input() link:string;
  @Output('delete') deleteevent:EventEmitter<void>=new EventEmitter<void>();
  @ViewChild('truncator') trun:ElementRef<HTMLElement>;
  @ViewChild('bodytext') bodytext:ElementRef<HTMLElement>;
  @ViewChild('notep') notep:ElementRef<HTMLElement>;

  constructor( private renderer:Renderer2) { }

  ngOnInit() {



  }
  ngAfterViewInit(){
    if(this.notep.nativeElement.scrollHeight > this.bodytext.nativeElement.clientHeight){
      this.renderer.setStyle(this.trun.nativeElement,'display','block');

    }else{
      this.renderer.setStyle(this.trun.nativeElement,'display','none');

    }
  }

  onxbutton(){
    this.deleteevent.emit();

  }


}
