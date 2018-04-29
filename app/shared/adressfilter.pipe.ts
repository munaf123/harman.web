import { Pipe, PipeTransform } from '@angular/core';
import { Adress } from './adress/adress.model';

@Pipe({
  name: 'adressfilter'
})
export class AdressfilterPipe implements PipeTransform {

  transform(adresses: Adress[], searchText: string): Adress[] {
    if(!searchText)
    {
      return adresses;
    }
    return adresses.filter(item => item.Adress1.indexOf(searchText) >-1
                          || item.Address2.indexOf(searchText) >-1
                          || item.State.indexOf(searchText) >-1
                          || item.City.indexOf(searchText) >-1
                          || item.PostalCode.indexOf(searchText) >-1);
      
  }

}
