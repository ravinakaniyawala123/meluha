import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  transform(editSubjects: any, searchText: any): any {
    if (searchText == null) return editSubjects;

    return editSubjects.filter(function (subject) {
      return subject.subjectName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
