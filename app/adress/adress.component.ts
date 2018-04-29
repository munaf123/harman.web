import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Adress } from '../shared/adress/adress.model';
import { AdressService } from '../shared/adress/adress.service';
import {AdressfilterPipe} from '../shared/adressfilter.pipe';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent implements OnInit {
  
  private addresses: Adress[];
  selectedAdress : Adress;
  isNewRecord : boolean;
  statusMessage: string;
  @ViewChild('readOnlyTemplate')readOnlyTemplate : TemplateRef <any>;
  @ViewChild('editTemplate')editTemplate : TemplateRef < any >
  constructor(private http: Http, private adresService: AdressService) {
   this.addresses = new Array<Adress>();
  }

  ngOnInit() {
    this.loadAddresses();
    }
  
  loadAddresses() {
    return this.adresService.getAdress().subscribe(addressData => {
      this.addresses = addressData;
      console.log(this.addresses);
    });
  }
  loadTemplate(adress: Adress)
  {
    if(this.selectedAdress && this.selectedAdress.Id === adress.Id)
    {
     return this.editTemplate;
    }
    return this.readOnlyTemplate;
  }

  addAdress() {
    this.selectedAdress =new Adress();
    this.addresses.push(this.selectedAdress);
    this.isNewRecord = true;    
}

  saveAdress()
  {
  if(this.isNewRecord){
    //add a new Employee
     this.adresService.addAdress(this.selectedAdress).subscribe((resp : Response) => {
      //  this.adress = resp.json(),  
        this.statusMessage = 'Record Added Successfully.',
        this.loadAddresses();
    });
    this.isNewRecord=false;
    this.selectedAdress = null;
   
}else{
    //edit the record
     this.adresService.updateAdress(this.selectedAdress.Id, this.selectedAdress).subscribe((resp : Response) => {
        this.statusMessage = 'Record Updated Successfully.',
         this.loadAddresses();
    });
    this.selectedAdress = null;
    
}
}
deleteAdress(adress:Adress){
  this.adresService.deleteAdress(adress.Id).subscribe((resp : Response) => {
         this.statusMessage = 'Record Deleted Successfully.',
          this.loadAddresses();
     });
    
}
  editAdress(adress: Adress)
  {
    this.selectedAdress = adress;
  }
  cancel()
  {
    this.selectedAdress= null;
  }
}
