import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Notes } from './notes.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotesService {

  private servUrl = "http://localhost:55198/api/Notes";
  constructor(private http: Http) { }
 
  //1. Function to return the Observable response containing all Notess
  getNotes(): Observable <Notes[]>{
    return this.http.get(this.servUrl).map((response: Response)=><Notes[]>response.json());
}
//2. Function to perform POST operation to create a new Notes
addNotes(note : Notes) : Observable <Response > {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
   return this
        .http
        .post(this.servUrl, JSON.stringify(note), options)
}
//3. Function to update Notes using PUT operation
updateNotes(id:number,note : Notes) : Observable < Response > {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
   return this
        .http
        .put(this.servUrl+`/`+id, JSON.stringify(note), options)
}
//4. Function to remove the Notes using DELETE operation
deleteNotes(id:number) : Observable < Response > {
   return this
        .http
        .delete(this.servUrl+`/`+id)
}
}