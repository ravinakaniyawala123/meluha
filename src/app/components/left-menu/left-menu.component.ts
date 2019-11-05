import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
@Output() click = new EventEmitter<any>();
clickedOrganization = false;
clickedCurriculum = false;
clickedContent = false;
clickedPackage = false;
clickedButton = '';
Button1 = 'Organization';
Button2 = 'Curriculum';
Button3 = 'Content';
Button4 = 'Package';
constructor() { }

  ngOnInit() {
    this.clickedButton = this.Button1;
    this.clickedOrganization = true;
    this.clickedCurriculum = false;
    this.clickedContent = false;
    this.clickedPackage = false;
  }
  isClickedOrgan() {
    
    this.click.emit(this.Button1);
    if (this.clickedButton !== this.Button1) {
      this.clickedButton = this.Button1;
      this.clickedOrganization = true;
      this.clickedCurriculum = false;
      this.clickedContent = false;
      this.clickedPackage = false;
    } else {
      return;
    }
  }
  isClickedCurriculum() {
    this.click.emit(this.Button2);
    if (this.clickedButton !== this.Button2) {
      this.clickedButton = this.Button2;
      this.clickedOrganization = false;
      this.clickedCurriculum = true;
      this.clickedContent = false;
      this.clickedPackage = false;
    } else {
      return;
    }
  }
  isClickedContent() {
    this.click.emit(this.Button3);
    if (this.clickedButton !== this.Button3) {
      this.clickedButton = this.Button3;
      this.clickedOrganization = false;
      this.clickedCurriculum = false;
      this.clickedContent = true;
      this.clickedPackage = false;
    } else {
      return;
    }
  }
  isClickedPackage() {
  
    this.click.emit(this.Button4);
    if (this.clickedButton !== this.Button4) {
      this.clickedButton = this.Button4;
      this.clickedOrganization = false;
      this.clickedCurriculum = false;
      this.clickedContent = false;
      this.clickedPackage = true;
    } else {
      return;
    }
  }
}
