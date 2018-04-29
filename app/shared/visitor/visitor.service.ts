import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Visitor } from './visitor.model';

@Injectable()
export class VisitorService {

  private servUrl = "http://localhost:55198/api/Visitors";
  constructor(private http: Http) { }
 
  //1. Function to return the Observable response containing all Visitors
  getVisitor(): Observable <Visitor[]>{
    return this.http.get(this.servUrl).map((response: Response)=><Visitor[]>response.json());
}
//2. Function to perform POST operation to create a new Visitor
addVisitor(note : Visitor) : Observable <Response > {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
   return this
        .http
        .post(this.servUrl, JSON.stringify(note), options)
}
//3. Function to update Visitor using PUT operation
updateVisitor(id:number,note : Visitor) : Observable < Response > {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
   return this
        .http
        .put(this.servUrl+`/`+id, JSON.stringify(note), options)
}
//4. Function to remove the Visitor using DELETE operation
deleteVisitor(id:number) : Observable < Response > {
   return this
        .http
        .delete(this.servUrl+`/`+id)
}
}