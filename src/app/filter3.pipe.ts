import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter3'
})
export class Filter3Pipe implements PipeTransform {

  transform(pacakageData: any, searchText: any): any {
    if (searchText == null) return pacakageData;

    return pacakageData.filter(function (item) {
      return item.packagedName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }

}
