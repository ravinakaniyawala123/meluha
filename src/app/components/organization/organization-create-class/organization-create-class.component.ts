import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassGroup } from '../../../model/classgroup';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-organization-create-class',
  templateUrl: './organization-create-class.component.html',
  styleUrls: ['./organization-create-class.component.css']
})
export class OrganizationCreateClassComponent implements OnInit {
  @Output() createClass = new EventEmitter<any>();
  @Output() close = new EventEmitter();
  @Output() showMessage = new EventEmitter<any>();
  classes: any[] = [];
  addClass = {
    'className': '',
    'hasGroups': true,
    'isActivity': true,
    'groups': [],
    'classId': ''
  };
  msgs: Message[];
  duplicate = [];
  constructor() {

  }
  ngOnInit() {
    this.init();
    this.addClass.classId = UUID.UUID().toString();
  
    this.classes.push(this.addClass);
  }
  Add() {
    
    this.init();
    this.classes.push(this.addClass);
    // this.addClass.className = '';
  }

  delete(h) {
    const index: number = this.classes.indexOf(h);
    if (index !== -1) {
      this.classes.splice(index, 1);
    }
    this.init();
  }

  // Shakti code or duplication of data//
  //start//

  onSubmit() {
    this.init();
    // if ( this.classes.classId  == '') {
    //   this.classes.push(this.addClass);
    // }

    localStorage.removeItem('duplicate');

    console.log('classes', this.classes);
    if (this.validation()) {
      this.classes = _.clone(this.classes);
      this.createClass.emit(this.classes);


      if (localStorage.getItem('duplicate') == null) {
        this.classes = [];
        this.addClass = {
          'className': '',
          'hasGroups': true,
          'isActivity': true,
          'groups': [],
          'classId': ''
        };
        this.init();
        this.classes.push(this.addClass);
      }
      else {
        let duplicateArray = JSON.parse(localStorage.getItem('duplicate'));

        // duplicateArray.forEach(a => {
        //   this.classes.forEach(b => {
        //     if (a.className.trim().toLowerCase() === b.className.trim().toLowerCase()) {
        //       this.duplicate.push(a);
        //       // const index: number = this.classes.indexOf( this.duplicate);
        //       // if (index !== -1) {
        //       //   this.classes.splice(index, 1);
        //       // }
        //     }
        //   });
        // });
        // this.duplicate.forEach(element => {
        //   element.colour = 'red';   
        // });
        // this.classes.push(this.duplicate);

      }


    }

  }

  //end//

  ////shakti code for issue 3///
  cancel() {
    this.classes = [];
    this.addClass = {
      'className': '',
      'hasGroups': true,
      'isActivity': true,
      'groups': [],
      'classId': ''
    };
    this.addClass.classId = UUID.UUID().toString();
    this.classes.push(this.addClass);
    this.addClass.className = '';
    this.close.emit();
  }
  init() {
    this.addClass = {
      'className': '',
      'hasGroups': true,
      'isActivity': true,
      'groups': [],
      'classId': ''
    };
    this.addClass.classId = UUID.UUID().toString();
    this.addClass.className = '';
    
  }

  validation() {
    let status = true;
    this.classes.forEach(b => {
      let cname = b.className.trim().toLowerCase();
      const exist_item = this.classes.filter(item => item.className.toLowerCase() === cname);
      console.log('exist_item', exist_item);
      if (exist_item.length > 1) {

        const message = 'There is a Duplication in the className';

        this.showMessage.emit(message);
        status = false;

      } else if (cname === '') {
        const message = 'Please Insert correct Class Name!';
        this.showMessage.emit(message);
        status = false;
      }

    });
    return status;

  }



  // showMessage(isSuccess: boolean, message) {
  //   console.log('message', message);
  //   this.msgs = [];
  //   if (isSuccess) {
  //     this.msgs.push({
  //       severity: 'info',
  //       summary: 'Info',
  //       detail: message
  //     });
  //   } else {
  //     this.msgs.push({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: message
  //     });
  //   }
  // }
}
