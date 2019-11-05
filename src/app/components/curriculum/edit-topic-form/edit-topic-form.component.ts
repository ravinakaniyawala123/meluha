import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Topic} from '../../../model/topic';

@Component({
  selector: 'app-edit-topic-form',
  templateUrl: './edit-topic-form.component.html',
  styleUrls: ['./edit-topic-form.component.css']
})
export class EditTopicFormComponent implements OnInit {
@Output() update = new EventEmitter<Topic>();
@Output() close = new EventEmitter();
@Input() topic: Topic;
editTopic: Topic;
  constructor() { }

  ngOnInit() {
  this.editTopic = new Topic();
  this.editTopic = Object.assign({}, this.topic);
  }
  ngOnChanges(changes: any) {
    if (changes.topic && changes.topic.currentValue) {
      this.editTopic = Object.assign({}, this.topic);
    }
  }
  onSubmit() {
    this.update.emit(this.editTopic);
  }
  cancel() {
    this.close.emit();
  }

}
