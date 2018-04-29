import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Tasks } from '../shared/tasks/tasks.model';
import { TasksService } from '../shared/tasks/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  private Tasks: Tasks[];
  selectedTasks : Tasks;
  isNewRecord : boolean;
  statusMessage: string;
  @ViewChild('readOnlyTemplate')readOnlyTemplate : TemplateRef <any>;
  @ViewChild('editTemplate')editTemplate : TemplateRef < any >
  constructor(private TasksService: TasksService) {
   this.Tasks = new Array<Tasks>();
  }

  ngOnInit() {
    this.loadTasks();
    }
  
  loadTasks() {
    return this.TasksService.getTasks().subscribe(addressData => {
      this.Tasks = addressData;
      console.log(this.Tasks);
    });
  }
  loadTemplate(Tasks: Tasks)
  {
    if(this.selectedTasks && this.selectedTasks.Id === Tasks.Id)
    {
     return this.editTemplate;
    }
    return this.readOnlyTemplate;
  }

  addTasks() {
    this.selectedTasks =new Tasks();
    this.Tasks.push(this.selectedTasks);
    this.isNewRecord = true;    
}

  saveTasks()
  {
  if(this.isNewRecord){
    //add a new Employee
     this.TasksService.addTasks(this.selectedTasks).subscribe((resp : Response) => {
      //  this.Tasks = resp.json(),  
        this.statusMessage = 'Record Added Successfully.',
        this.loadTasks();
    });
    this.isNewRecord=false;
    this.selectedTasks = null;
   
}else{
    //edit the record
     this.TasksService.updateTasks(this.selectedTasks.Id, this.selectedTasks).subscribe((resp : Response) => {
        this.statusMessage = 'Record Updated Successfully.',
         this.loadTasks();
    });
    this.selectedTasks = null;
    
}
}
deleteTasks(Tasks:Tasks){
  this.TasksService.deleteTasks(Tasks.Id).subscribe((resp : Response) => {
         this.statusMessage = 'Record Deleted Successfully.',
          this.loadTasks();
     });
    
}
  editTasks(Tasks: Tasks)
  {
    this.selectedTasks = Tasks;
  }
  cancel()
  {
    this.selectedTasks= null;
  }
}

