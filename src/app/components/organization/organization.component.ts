import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Board } from '../../model/board';
import { ClassGroup } from '../../model/classgroup';
import { Group } from '../../model/group';
import * as _ from 'lodash';
import { Message } from 'primeng/api';

@Component({

  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  // This Line     
})
export class OrganizationComponent implements OnInit {

  boards: Board[] = [];
  board: Board;
  classes: ClassGroup[] = [];
  showableClasses: ClassGroup[] = [];

  editGroupClass: any[] = [];
  groups: Group[] = [];

  editableBoard: Board;
  editableClass: ClassGroup;
  enableEdit = false;

  // for create dialog showing
  showCreateBoard: Boolean;
  showEditBoard = false;
  searchText = "";
  showCreateClass = false;
  showCreateGroup = false;
  showClassTable = false;
  showCreateSimpleClass = false;
  showEditGroupDialog = true;
  showDialog = false;
  showClass = false;
  showGroup = false;
  show = false;
  str: string;

  name: string;
  showEditGroup = false;
  groupName: string;
  showGroupList = false;
  editableGroup: string[] = [];
  A: number[] = [];

  boardId = '';
  msgs: Message[] = [];
  selectedClassGroup: ClassGroup = new ClassGroup();
  duplicateArray = [];
  showBUttonOnBoardPage: boolean;
  constructor(private api: ApiService) {
  }
  ngOnInit() {

    this.showBUttonOnBoardPage = true;
    this.boards = [];
    this.showCreateBoard = false;
    this.show = true;
    this.getBoards();
  }
  getBoards() {
    this.api.organization.gets().promise()
      .then(resp => {
        let body = resp.body;
        localStorage.setItem('etag', resp.headers.get('etag'));
        console.log('receive--------------->', body);

        if (!body.Attributes) {
          this.boards = body.Item.boards;
          console.log('receive--------------->', this.boards);
        }
      })
      .catch(e => {
        this.showMessage(false, 'Connection error!');
      });
  }

  showCreateBoardDialog() {
    this.showCreateBoard = true;
  }

  onCreateBoard(data) {

    let status = true;
    this.str = data.boardName.trim();
    this.boards.forEach(b => {
      if (b.boardName.toLowerCase() === data.boardName.toLowerCase()) {
        const message = 'Duplicated "' + data.boardName + '"Name!';
        this.showMessage(false, message);
        status = false;
      }
    });

    if (this.str === '') {
      const message = 'Please Insert correct Board Name!';
      this.showMessage(false, message);
    } else if (status) {
      const message = 'Created"' + data.boardName + '" Board!';
      this.showMessage(true, message);
      console.log('newly created data', data);
      this.boards.unshift(data);
      this.boards = JSON.parse(JSON.stringify(this.boards));
      console.log('fresehed', this.boards);
      // this.showBoards = _.cloneDeep(this.showBoards);
      this.showCreateBoard = false;
      this.showBUttonOnBoardPage = false;
      // this.showClass = true;
    }
  }

  selectBoard(board: Board) {
    this.showBUttonOnBoardPage = true;
    this.showableClasses = [];
    this.editGroupClass = [];
    console.log('this is', this.showableClasses);
    console.log('board', board);
    if (typeof (board) === 'undefined') {
      return;
    } else {

      this.editableBoard = JSON.parse(JSON.stringify(board));
      this.boardId = this.editableBoard.boardId;
      if (!this.editableBoard.classes) {
        this.classes = [];
        this.showGroupList = true;
      } else {
        console.log('board class', this.editableBoard.classes);
        this.showableClasses = this.editableBoard.classes;

      }
      this.setClassColumn();
      this.enableEdit = true;
      this.showClass = true;
      this.showGroup = true;
      this.showGroupList = false;
      this.showClass = true;
      this.showClassTable = true;
      this.showGroupList = true;
    }
  }

  showEditBoardDialog() {
    this.showEditBoard = true;
  }

  onUpdateBoard(data) {
    let status = true;
    console.log('updated board', data);
    this.str = data.boardName.trim();
    const bname = data.boardName.toLowerCase();
    const exist_item = this.boards.filter(item => item.boardName.toLowerCase() === bname);
    if (exist_item.length > 1) {
      const message = 'Duplicated "' + data.boardName + '" Name!';
      this.showMessage(false, message);
      status = false;
    }
    if (status) {
      const message = 'Updated "' + data.boardName + '" Board!';
      this.showMessage(true, message);
      localStorage.setItem('boardUpdated', 'boaardUpdated');
      this.editableBoard.boardName = data.boardName;
      this.editableBoard.boardCode = data.boardCode;
      this.showEditBoard = false;
      this.showBUttonOnBoardPage = false;

    }
  }

  DeleteBoard(data: Board) {
    debugger;
    this.showEditBoard = false;
    this.boards = _.filter(this.boards, c => c.boardId !== this.editableBoard.boardId);
    const message = 'Deleted "' + this.editableBoard.boardName + '" Board';
    this.showMessage(true, message);
    this.showClass = false;
    this.showGroup = false;
    this.enableEdit = false;
    this.showClass = false;
    this.showClassTable = false;
    this.showGroupList = false;
    this.saveBoardData();
  }


  //-----------------------------------------------Class ---------------------------------------------------

  showCreateClassesDialog() {
    if (!this.boardId) {
      const message = 'Please select the anyone Board!';
      this.showMessage(false, message);
      this.showCreateClass = false;
    } else {
      this.showCreateClass = true;
    }

  }
  setClassColumn() {
    let limit = 0;
    if (this.showableClasses.length % 3) {
      limit = Math.floor(this.showableClasses.length / 3 + 1);
    } else {
      limit = this.showableClasses.length / 3;
    }
    this.A = [];
    for (let i = 0; i < limit; i++) {
      this.A.push(i);
    }
  }
  onCreateClass(addClass) {

    console.log('----->', addClass);
    let i = this.showableClasses.length;
    let add_class = Object.assign(addClass);
    if (this.validationClasses(add_class)) {
      for (let k = 0; k < add_class.length; k++) {
        console.log('=========>', addClass[k]);
        this.showableClasses.push(add_class[k]);
        console.log('...................>', this.showableClasses);
      }
      console.log('showclass', this.showableClasses);
      let j = this.showableClasses.length;
      this.setClassColumn();
      const message = ' Created ' + (j - i) + ' Classes';
      this.showMessage(true, message);
      this.showCreateClass = false;
      this.showBUttonOnBoardPage = false;

    }

  }
  validationClasses(data) {
    let status = true;
    console.log('validating data', data);
    data.forEach(b => {
      let cname = b.className.trim().toLowerCase();
      const exist_item = this.showableClasses.filter(item => item.className.toLowerCase() === cname);
      console.log('exist_item', exist_item);
      if (exist_item.length > 0) {
        // Shakti code or duplication of data//
        //start//

        this.duplicateArray.push(exist_item[0]);
        localStorage.setItem('duplicate', JSON.stringify(this.duplicateArray));
        const message = 'There is a duplication';
        this.showMessage(false, message);
        status = false;
      }
    });
    return status;
    //end//

  }

  editClass(classGroup: ClassGroup) {
    // this.editableClass = new ClassGroup();
    this.showCreateSimpleClass = true;
    this.editableClass = JSON.parse(JSON.stringify(classGroup));
    this.showEditGroupDialog = true;
  }

  onUpdateSimpleClass(updatedClassGroup: ClassGroup) {
    this.updateClass(updatedClassGroup);
    // this.refreshBoardTable(this.classes);
  }

  updateClass(updatedClassGroup) {
    if (updatedClassGroup.hasGroups == false) {
      // updatedClassGroup.groups = [];   
      for (let i = 0; i < this.showableClasses.length; i++) {
        if (this.showableClasses[i].classId === updatedClassGroup.classId) {
          this.showableClasses[i].groups = [];
        }
      }


    }
    let status = true;
    let cname = updatedClassGroup.className.trim().toLowerCase();
    const exist_item = this.showableClasses.filter(item => item.className.toLowerCase() === cname);
    console.log('exist_item', exist_item);
    if (exist_item.length > 1) {
      const message = 'Duplicated "' + cname + '" Name!';
      this.showMessage(false, message);
      status = false;
    } else if (exist_item.length > 0 && exist_item[0].classId !== updatedClassGroup.classId) {
      const message = 'Duplicated "' + cname + '" Name!';
      this.showMessage(false, message);
      status = false;
    }
    if (status) {
      for (let i = 0; i < this.showableClasses.length; i++) {
        if (this.showableClasses[i].classId === updatedClassGroup.classId) {

          const message = 'Updated "' + updatedClassGroup.className + '" Class!';
          this.showMessage(true, message);
          this.showableClasses[i].className = updatedClassGroup.className;
          this.showableClasses[i].isActivity = updatedClassGroup.isActivity;
          this.showableClasses[i].hasGroups = updatedClassGroup.hasGroups;
          this.showCreateSimpleClass = false;
        }
      }
      this.showBUttonOnBoardPage = false;
    }
    // this.refreshBoardTable(this.classes);
  }

  onDeleteSimpleClass(deletedClassGroup: ClassGroup) {
    console.log(deletedClassGroup);
    this.setClassColumn();
    this.showableClasses = _.filter(this.showableClasses, c => c.classId !== deletedClassGroup.classId);
    const message = 'Deleted "' + deletedClassGroup.className + '"Class!';
    this.showMessage(true, message);
    // this.refreshBoardTable(this.classes);
    this.showCreateSimpleClass = false;
    this.showBUttonOnBoardPage = false;
  }

  //------------------------------------------------Group -----------------------------------------------------//

  showGroupDialog() {
    this.editGroupClass = _.cloneDeep(this.showableClasses);
    this.showCreateGroup = true;
  }
  onCreateGroup(data: any) {
    for (let k = 0; k < this.showableClasses.length; k++) {
      if (this.showableClasses[k].classId === data.classId) {
        this.showableClasses[k] = JSON.parse(JSON.stringify(data));
      }
    }
    const message = 'Created some Groups';
    this.showMessage(true, message);
    this.showCreateGroup = false;
    this.showBUttonOnBoardPage = false;


  }

  onClickGroup(classGroup: ClassGroup, group: Group) {
    this.selectedClassGroup = JSON.parse(JSON.stringify(classGroup));
    this.editableGroup = JSON.parse(JSON.stringify(group));
    this.showEditGroup = true;
  }

  onUpdateGroup(group) {
    this.str = group.groupName.trim();
    for (let i = 0; i < this.showableClasses.length; i++) {
      if (this.showableClasses[i].classId === this.selectedClassGroup.classId) {
        let status = true;
        this.showableClasses[i].groups.forEach(b => {
          if (b.groupName.toLowerCase() === group.groupName.toLowerCase()) {
            const message = 'Duplicated "' + group.groupName + '" Name!';
            this.showMessage(false, message);
            status = false;
          }
        });
        if (this.str === '') {
          console.log('white space');
          const message = 'Please Insert correct Group Name!';
          this.showMessage(false, message);
        } else if (status) {
          this.showableClasses[i].groups.forEach(c => {
            if (c.groupId === group.groupId) {
              const message = 'Updated "' + group.groupName + '" Name!';
              this.showMessage(true, message);
              c.groupName = group.groupName;
            }
            this.showEditGroup = false;
          });
          this.showBUttonOnBoardPage = false;
        }
      }
    }
  }
  onDeleteGroup(group: Group) {

    for (let i = 0; i < this.showableClasses.length; i++) {
      if (this.showableClasses[i].classId === this.selectedClassGroup.classId) {
        this.showableClasses[i].groups = _.filter(this.showableClasses[i].groups, g => g.groupId !== group.groupId);
        const message = 'Deleted "' + group.groupName + '" Group!';
        this.showMessage(true, message);

      }
    }
    this.showBUttonOnBoardPage = false;
    this.showEditGroup = false;
  }

  // onCloseDialog() {
  //   this.showCreateBoard = false;
  //   this.showCreateClass = false;
  //   this.showCreateGroup = false;
  //   this.showEditBoard = false;
  // }

  saveBoardData() {



    console.log(this.boards);

    this.editableBoard.classes = JSON.parse(JSON.stringify(this.showableClasses));
    for (let i = 0; i < this.boards.length; i++) {
      if (this.boards[i].boardId === this.boardId) {
        this.boards[i] = JSON.parse(JSON.stringify(this.editableBoard));
      }
    }
    this.api.organization.put(this.boards).promise()
      .then(resp => {
        console.log('post------------->', resp);
        // let body = resp.body;
        let etag = resp.headers.get('etag');
        //
        // localStorage.setItem(If-Match, 'etag');
        console.log('------------->etag', etag);
        localStorage.setItem('etag', resp.headers.get('etag'));
        if (!resp.Attributes) {
          this.showBUttonOnBoardPage = true;
          const message = 'Save Success!';
          this.showMessage(true, message);

          if (localStorage.getItem('boardUpdated') == undefined || localStorage.getItem('boardUpdated') == null) {

          }
          else {
            this.showEditBoard = false;
            this.showClass = false;
            this.showGroup = false;
            this.enableEdit = false;
            this.showClass = false;
            this.showClassTable = false;
            this.showGroupList = false;
            this.getBoards();
            localStorage.removeItem('boardUpdated');
          }

        }
      }).catch(resp => {
        const message = 'Save Error!';
        this.showMessage(false, message);
      });



  }

  refreshBoardTable(data) {
    for (let i = 0; i < this.boards.length; i++) {
      if (this.boards[i].boardId === this.editableBoard.boardId) {
        this.boards[i].classes = data;
      }
    }
  }
  showMessage(isSuccess: boolean, message: string) {
    this.msgs = [];

    if (isSuccess) {
      this.msgs.push({
        severity: 'info',
        summary: 'Info',
        detail: message
      });
    } else {
      this.msgs.push({
        severity: 'error',
        summary: 'Error',
        detail: message
      });
    }
  }

  onShowMessage(message) {
    console.log('message', message);
    this.showMessage(false, message);
  }

  onCloseDialog() {

    this.showCreateBoard = false;
    this.showCreateClass = false;
    this.showCreateGroup = false;
  }

  public popoverTitle: string = 'Confirm';
  public popoverMessage: string = 'Are you sure?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;


}
