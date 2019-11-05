import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(boards: any, searchText: any): any {
    if (searchText == null) return boards;

    return boards.filter(function (board) {
      return board.boardName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
