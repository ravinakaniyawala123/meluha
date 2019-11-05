import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Chapter} from '../../../model/chapter';
import {UUID} from "angular2-uuid";

@Component({
  selector: 'app-create-chapter-from',
  templateUrl: './create-chapter-from.component.html',
  styleUrls: ['./create-chapter-from.component.css']
})
export class CreateChapterFromComponent implements OnInit {
  @Output() create = new EventEmitter<Chapter>();
  @Output() close = new EventEmitter();
  newChapter: Chapter = new Chapter();
  changedChapter: Chapter;
  constructor() { }
  ngOnInit() {
    this.newChapter = new Chapter();
    // this.changedChapter = Object.assign({}, this.newChapter);
  }
  // ngOnChanges(changes: any) {
  //   if (changes.newChapter && changes.newChapter.currentValue) {
  //     this.changedChapter = Object.assign({}, this.newChapter);
  //   }
  // }
  onSubmit() {
    this.newChapter.chapterId = UUID.UUID();
    this.create.emit(this.newChapter);
    this.newChapter.chapterName="";
    this.newChapter.chapterNumber="";
    this.newChapter.chapterDescription="";
  }

  cancel() {
    this.close.emit();
  }

}
