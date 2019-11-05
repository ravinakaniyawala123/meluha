import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from '../../../model/subject';

@Component({
  selector: 'app-edit-subject-form',
  templateUrl: './edit-subject-form.component.html',
  styleUrls: ['./edit-subject-form.component.css']
})
export class EditSubjectFormComponent implements OnInit {
@Output() update = new EventEmitter<Subject>();
@Output() del = new EventEmitter<Subject>();
@Input() subject: Subject;
editSubject: Subject;
  popoverTitle:any;
  popoverMessage:any;
  enableCreateTopic:any;
  cancelClicked:any;
  constructor() { }
  ngOnInit() {
    this.editSubject = new Subject();
    console.log('first state', this.subject.subjectName);
    this.editSubject = Object.assign({}, this.subject);
  }
  ngOnChanges(changes: any) {
    if (changes.subject && changes.subject.currentValue) {
      this.editSubject = Object.assign({}, this.subject);
    }
  }
  onSubmit() {
    console.log('save state', this.subject.subjectName);
    // this.editSubject = Object.assign({}, this.subject);
   this.update.emit(this.editSubject);
  }
  Delete() {
    // this.editSubject = Object.assign({}, this.subject);
    this.del.emit(this.editSubject);
  }
}
