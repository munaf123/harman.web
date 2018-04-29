import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Adress } from './adress.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdressService {

  private servUrl = "http://localhost:55198/api/Adresses";
  constructor(private http: Http) { }
 
  //1. Function to return the Observable response containing all Adresss
  getAdress(): Observable <Adress[]>{
    return this.http.get(this.servUrl).map((response: Response)=><Adress[]>response.json());
}
//2. Function to perform POST operation to create a new Adress
addAdress(adress : Adress) : Observable <Response > {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
   return this
        .http
        .post(this.servUrl, JSON.stringify(adress), options)
}
//3. Function to update Adress using PUT operation
updateAdress(id:number,adress : Adress) : Observable < Response > {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
   return this
        .http
        .put(this.servUrl+`/`+id, JSON.stringify(adress), options)
}
//4. Function to remove the Adress using DELETE operation
deleteAdress(id:number) : Observable < Response > {
   return this
        .http
        .delete(this.servUrl+`/`+id)
}
}
