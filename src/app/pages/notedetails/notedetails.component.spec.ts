import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotedetailsComponent } from './notedetails.component';

describe('NotedetailsComponent', () => {
  let component: NotedetailsComponent;
  let fixture: ComponentFixture<NotedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
