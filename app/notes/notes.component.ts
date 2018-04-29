import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NotesService } from '../shared/notes/notes.service';
import { Notes } from '../shared/notes/notes.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  private Notes: Notes[];
  selectedNotes : Notes;
  isNewRecord : boolean;
  statusMessage: string;
  @ViewChild('readOnlyTemplate')readOnlyTemplate : TemplateRef <any>;
  @ViewChild('editTemplate')editTemplate : TemplateRef < any >
  constructor(private notesService: NotesService) {
   this.Notes = new Array<Notes>();
  }

  ngOnInit() {
    this.loadNotes();
    }
  
  loadNotes() {
    return this.notesService.getNotes().subscribe(addressData => {
      this.Notes = addressData;
      console.log(this.Notes);
    });
  }
  loadTemplate(Notes: Notes)
  {
    if(this.selectedNotes && this.selectedNotes.Id === Notes.Id)
    {
     return this.editTemplate;
    }
    return this.readOnlyTemplate;
  }

  addNotes() {
    this.selectedNotes =new Notes();
    this.Notes.push(this.selectedNotes);
    this.isNewRecord = true;    
}

  saveNotes()
  {
  if(this.isNewRecord){
    //add a new Employee
     this.notesService.addNotes(this.selectedNotes).subscribe((resp : Response) => {
      //  this.Notes = resp.json(),  
        this.statusMessage = 'Record Added Successfully.',
        this.loadNotes();
    });
    this.isNewRecord=false;
    this.selectedNotes = null;
   
}else{
    //edit the record
     this.notesService.updateNotes(this.selectedNotes.Id, this.selectedNotes).subscribe((resp : Response) => {
        this.statusMessage = 'Record Updated Successfully.',
         this.loadNotes();
    });
    this.selectedNotes = null;
    
}
}
deleteNotes(Notes:Notes){
  this.notesService.deleteNotes(Notes.Id).subscribe((resp : Response) => {
         this.statusMessage = 'Record Deleted Successfully.',
          this.loadNotes();
     });
    
}
  editNotes(Notes: Notes)
  {
    this.selectedNotes = Notes;
  }
  cancel()
  {
    this.selectedNotes= null;
  }
}

