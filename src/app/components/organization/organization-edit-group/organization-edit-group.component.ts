import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from "../../../model/group";

@Component({
  selector: 'app-organization-edit-group',
  templateUrl: './organization-edit-group.component.html',
  styleUrls: ['./organization-edit-group.component.css']
})
export class OrganizationEditGroupComponent implements OnInit {
  @Output() updateGroup = new EventEmitter<any>();
  @Output() deleteGroup = new EventEmitter<any>();
  // @Input() editGroup: string [] = [];
  @Input() editGroup: Group;
  selectedGroup: Group = new Group();
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes:any){
    if (changes.editGroup && changes.editGroup.currentValue) {
      this.selectedGroup = Object.assign({}, this.editGroup);
    }
  }
  onSubmit() {
    console.log(this.editGroup);
    this.updateGroup.emit(this.selectedGroup);
  }

  DeleteGroup() {
    console.log(this.editGroup);
    this.deleteGroup.emit(this.selectedGroup);
  }
  deleteBoard() {

  }

  public popoverTitle: string = 'Confirm';
  public popoverMessage: string = 'Are you sure?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
}
