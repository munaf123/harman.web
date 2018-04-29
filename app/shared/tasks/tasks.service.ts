import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Tasks } from './tasks.model';

@Injectable()
export class TasksService {

  private servUrl = "http://localhost:55198/api/Tasks";
  constructor(private http: Http) { }
 
  //1. Function to return the Observable response containing all Taskss
  getTasks(): Observable <Tasks[]>{
    return this.http.get(this.servUrl).map((response: Response)=><Tasks[]>response.json());
}
//2. Function to perform POST operation to create a new Tasks
addTasks(note : Tasks) : Observable <Response > {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
   return this
        .http
        .post(this.servUrl, JSON.stringify(note), options)
}
//3. Function to update Tasks using PUT operation
updateTasks(id:number,note : Tasks) : Observable < Response > {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
   return this
        .http
        .put(this.servUrl+`/`+id, JSON.stringify(note), options)
}
//4. Function to remove the Tasks using DELETE operation
deleteTasks(id:number) : Observable < Response > {
   return this
        .http
        .delete(this.servUrl+`/`+id)
}
}