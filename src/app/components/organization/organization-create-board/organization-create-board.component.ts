import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../../model/board';
import { UUID } from "angular2-uuid";

@Component({
  selector: 'app-organization-create-board',
  templateUrl: './organization-create-board.component.html',
  styleUrls: ['./organization-create-board.component.css']
})
export class OrganizationCreateBoardComponent implements OnInit {
  @Output() create = new EventEmitter<Board>();
  @Output() close = new EventEmitter();
  @Output() showMessage = new EventEmitter<any>();
  board: Board;
  constructor() { }

  ngOnInit() {

    this.board = new Board();
  }

  onSubmit() {
    if (this.validation()) {
      this.board.boardId = UUID.UUID();
      this.create.emit(this.board);
    }
    this.board = new Board();

  }

  cancel() {
    
    this.close.emit();
  }
  ////Shakti code for resolving issue number 1//// 

  validation() {
    
    let status = true;
    if (this.board.boardName.trim() === '') {
      const message = 'Please Insert correct Board Name!';
      this.showMessage.emit(message);
      status = false;
    }

    else if (this.board.boardCode.length === 0 || !this.board.boardCode.trim()) {
      const message = 'Board Code cannot be empty!';
      this.showMessage.emit(message);
      status = false;
    }
    return status;
  }

}
