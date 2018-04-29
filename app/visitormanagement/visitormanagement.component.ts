import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Visitor } from '../shared/visitor/visitor.model';
import { VisitorService } from '../shared/visitor/visitor.service';

@Component({
  selector: 'app-visitormanagement',
  templateUrl: './visitormanagement.component.html',
  styleUrls: ['./visitormanagement.component.css']
})
export class VisitormanagementComponent implements OnInit {
  private Visitor: Visitor[];
  selectedVisitor : Visitor;
  isNewRecord : boolean;
  statusMessage: string;
  @ViewChild('readOnlyTemplate')readOnlyTemplate : TemplateRef <any>;
  @ViewChild('editTemplate')editTemplate : TemplateRef < any >
  constructor(private VisitorService: VisitorService) {
   this.Visitor = new Array<Visitor>();
  }

  ngOnInit() {
    this.loadVisitor();
    }
  
  loadVisitor() {
    return this.VisitorService.getVisitor().subscribe(addressData => {
      this.Visitor = addressData;
      console.log(this.Visitor);
    });
  }
  loadTemplate(Visitor: Visitor)
  {
    if(this.selectedVisitor && this.selectedVisitor.Id === Visitor.Id)
    {
     return this.editTemplate;
    }
    return this.readOnlyTemplate;
  }

  addVisitor() {
    this.selectedVisitor =new Visitor();
    this.Visitor.push(this.selectedVisitor);
    this.isNewRecord = true;    
}

  saveVisitor()
  {
  if(this.isNewRecord){
    //add a new Employee
     this.VisitorService.addVisitor(this.selectedVisitor).subscribe((resp : Response) => {
      //  this.Visitor = resp.json(),  
        this.statusMessage = 'Record Added Successfully.',
        this.loadVisitor();
    });
    this.isNewRecord=false;
    this.selectedVisitor = null;
   
}else{
    //edit the record
     this.VisitorService.updateVisitor(this.selectedVisitor.Id, this.selectedVisitor).subscribe((resp : Response) => {
        this.statusMessage = 'Record Updated Successfully.',
         this.loadVisitor();
    });
    this.selectedVisitor = null;
    
}
}
deleteVisitor(Visitor:Visitor){
  this.VisitorService.deleteVisitor(Visitor.Id).subscribe((resp : Response) => {
         this.statusMessage = 'Record Deleted Successfully.',
          this.loadVisitor();
     });
    
}
  editVisitor(Visitor: Visitor)
  {
    this.selectedVisitor = Visitor;
  }
  cancel()
  {
    this.selectedVisitor= null;
  }
}

