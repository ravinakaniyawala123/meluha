import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClassGroup} from '../../../model/classgroup';

@Component({
  selector: 'app-organization-creat-simple-class',
  templateUrl: './organization-creat-simple-class.component.html',
  styleUrls: ['./organization-creat-simple-class.component.css']
})
export class OrganizationCreatSimpleClassComponent implements OnInit {
  @Output() updateSimpleClass = new EventEmitter<any>();
  @Output() deleteSimpleClass = new EventEmitter<any>();
  @Input() editSimpleClass: ClassGroup;
  sameSimpleClass: ClassGroup;
  constructor() { }

  ngOnInit() {
    this.editSimpleClass = new ClassGroup();
    this.sameSimpleClass = Object.assign({}, this.editSimpleClass);
  }
  ngOnChanges(changes: any) {
    if (changes.editSimpleClass && changes.editSimpleClass.currentValue) {
      this.sameSimpleClass = Object.assign({}, this.editSimpleClass);
    }
  }
  onSubmit() {
    this.updateSimpleClass.emit(this.sameSimpleClass);
  }
  delete() {
    this.deleteSimpleClass.emit(this.sameSimpleClass);
  }

    public popoverTitle: string = 'Confirm';
  public popoverMessage: string = 'Are you sure?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

}
