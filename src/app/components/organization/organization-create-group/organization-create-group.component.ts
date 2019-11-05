import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassGroup } from '../../../model/classgroup';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
@Component({
  selector: 'app-organization-create-group',
  templateUrl: './organization-create-group.component.html',
  styleUrls: ['./organization-create-group.component.css']
})
export class OrganizationCreateGroupComponent implements OnInit {
  @Output() createGroup = new EventEmitter<any>();
  @Output() close = new EventEmitter();
  @Input() classes: ClassGroup[];
  @Output() showMessage = new EventEmitter<any>();

  groups: any[] = [];
  addGroup = {
    'groupName': '',
    'groupId': '',
  };

  showClasses: any[] = [];
  // selectedClassGroup: ClassGroup = new ClassGroup();
  selectedClassGroup: any;
  groupId = '';

  constructor() {
    this.selectedClassGroup = 'hi';
  }

  ngOnInit() {
    this.init();
    this.groupId = UUID.UUID().toString();
    this.addGroup.groupId = this.groupId;
    this.groups.push(this.addGroup);

  }

  onSubmit() {
    console.log('submit group', this.selectedClassGroup);
    if (this.validation()) {
      for (let i = 0; i < this.groups.length; i++) {
        this.selectedClassGroup.groups.push(this.groups[i]);
      }

      this.createGroup.emit(this.selectedClassGroup);
      this.groups = [];
      this.init();

    }

  }
  delete(h) {
    const index: number = this.groups.indexOf(h);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
    this.init();
  }
  cancel() {

    this.groups = [];
    this.addGroup = {
      'groupName': '',
      'groupId': '',
    };
    this.groups.push(this.addGroup);
    this.showClasses = Object.assign({}, this.classes);
    this.close.emit();

  }
  onSelectClassGroup(classGroup: ClassGroup) {
    this.selectedClassGroup = classGroup;
  }
  Add() {
    this.init();
    this.groupId = UUID.UUID().toString();
    this.addGroup.groupId = this.groupId;
    this.groups.push(this.addGroup);
  }
  filterItemsOfType(type) {
    if (this.classes) {
      return this.classes.filter(x => x.hasGroups === type);
    } else {
      return;
    }
  }
  init() {
    this.addGroup = {
      'groupName': '',
      'groupId': '',
    };
    this.showClasses = Object.assign({}, this.classes);

  }

  validation() {
    
    console.log('validation');
    let status = true;
    this.groups.forEach(b => {
      let gname = b.groupName.trim().toLowerCase();
      const exist_item = this.groups.filter(item => item.groupName.toLowerCase() === gname);
      console.log('exist_item', exist_item);
      if (exist_item.length > 1) {
        const message = 'There is a Duplication in the Group Name';
        this.showMessage.emit(message);
        status = false;
      } else if (gname === '') {
        const message = 'Please Insert correct Group Name!';
        this.showMessage.emit(message);
        status = false;
      }

    });

    if (this.selectedClassGroup == 'hi') {
      const message = 'Please Select Class Name!';
      this.showMessage.emit(message);
    }
    else {
      this.groups.forEach(b => {
        let gname = b.groupName.trim().toLowerCase();
        const exist_item = this.selectedClassGroup.groups.filter(item => item.groupName.toLowerCase() === gname);
        console.log('exist_item', exist_item);
        if (exist_item.length > 0) {
          const message = 'There is a duplication';
          this.showMessage.emit(message);
          status = false;
        }
      });
    }

    return status;

  }


}
