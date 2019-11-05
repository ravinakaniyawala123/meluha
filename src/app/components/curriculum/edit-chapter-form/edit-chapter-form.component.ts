import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chapter} from '../../../model/chapter';

@Component({
  selector: 'app-edit-chapter-form',
  templateUrl: './edit-chapter-form.component.html',
  styleUrls: ['./edit-chapter-form.component.css']
})
export class EditChapterFormComponent implements OnInit {
@Output() update = new EventEmitter<Chapter>();
@Output() close = new EventEmitter();
@Input() chapter: Chapter;
editChapter: Chapter;
  constructor() { }

  ngOnInit() {
    this.editChapter = new Chapter();
    this.editChapter = Object.assign({}, this.chapter);
  }
  ngOnChanges(changes: any) {
    if (changes.chapter && changes.chapter.currentValue) {
      this.editChapter = Object.assign({}, this.chapter);
    }
  }
  onSubmit() {
    this.update.emit(this.editChapter);
  }
  cancel() {
    this.close.emit();
  }

}
