import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Topic } from '../../../model/topic';
import { UUID } from "angular2-uuid";

@Component({
  selector: 'app-create-topic-form',
  templateUrl: './create-topic-form.component.html',
  styleUrls: ['./create-topic-form.component.css']
})
export class CreateTopicFormComponent implements OnInit {
  @Output() create = new EventEmitter<Topic>();
  @Output() close = new EventEmitter();
  newTopic: Topic = new Topic();
  constructor() { }

  ngOnInit() {
    this.newTopic = new Topic();
  }
  onSubmit() {

    this.newTopic.topicId = UUID.UUID();
    this.create.emit(this.newTopic);
    this.newTopic.topicName = "";
  }
  cancel() {
    this.close.emit();
  }

}
