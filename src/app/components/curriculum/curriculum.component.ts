import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from '../../model/subject';
import { Chapter } from '../../model/chapter';
import { Board } from '../../model/board';
import { ApiService } from '../../api/api.service';
import { Group } from '../../model/group';
import { ClassGroup } from '../../model/classgroup';
import { UUID } from 'angular2-uuid';
import { Message } from 'primeng/api';
import { Topic } from "../../model/topic";
import { TokenPosition } from "tslint";
import * as _ from 'lodash';
import { type } from "os";
import { DialogModule } from 'primeng/dialog';
import { debug } from 'util';
import { Filter2Pipe } from 'src/app/filter2.pipe';


@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CurriculumComponent implements OnInit {
  editSubjects: Subject[] = [];
  showableSubjects: any[] = [];
  searchText = "";
  dummySubject: any[] = [];
  newSubject: Subject = new Subject();
  boards: Board[];
  classGroup: ClassGroup[];
  groups: Group[];
  chapters: Chapter[];
  editChapters: Chapter[] = [];
  showableChapter: any[] = [];
  dummyChapter: any[] = [];
  editTopics: Topic[] = [];
  newChapter: Chapter = new Chapter();
  newTopic: Topic = new Topic();
  selectedSubject: Subject = new Subject();
  selectedBoard: Board;
  selectedClass: ClassGroup;
  selectedGroup: Group;
  selectedChapter: Chapter;
  updatableSubject: Subject;
  editableTopic: Topic;
  subject_Name: string;
  chapterName = 'Chapter';
  msgs: Message[] = [];
  showCreateChapter = false;
  showCreateTopic = false;
  board_Name = '';
  groupClass_Name = '';
  group_Name = '';
  I = 0;
  A: number[] = [];
  B: number[] = [];
  C: number[] = [];
  showClassButton = false;
  showGroupButton = false;
  showCreatedSubject = false;
  inVisibleEditChapter = false;
  inVisibleTable = false;
  clickableAddChapterButton = false;
  showEditSubject = false;
  inVisibleEditTopic = false;
  enableCreateTopic = true;
  enableCreateTopicSaveButton = true;
  enableCreateButtonSave = true;
  showEditChapter = false;
  enableCreate = true;
  showEditTopic = false;
  show = false;
  show195 = false;
  enable = true;
  formenable = false;
  editableChapter: Chapter;
  romanNumber = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'
  ];
  popOver: boolean;
  subject: Subject;
  constructor(private api: ApiService) {
  }

  showDialog() {
    this.popOver = true;
  }


  ngOnInit() {
    this.clickableAddChapterButton = false;
    this.inVisibleEditChapter = true;
    this.inVisibleTable = true;
    this.inVisibleEditTopic = true;
    this.updatableSubject = new Subject();
    this.enable = true;
    this.getBoards();
  }

  getBoards() {
    this.api.organization.gets().promise()
      .then(resp => {
        const body = resp.body;
        const ifmatch = resp.headers.get('ifmatch');
        localStorage.setItem('etag', resp.headers.get('etag'));
        if (!body.Attributes) {
          this.boards = body.Item.boards;
        }
      })
      .catch(e => {
        const message = e.get('message');
        this.showMessage(false, message);
      });
  }




  getBoardId(selectedBoard, event) {
    if (selectedBoard == null || selectedBoard.boardName == this.selectedBoard.boardName) {
      this.enableCreateTopic = true;
      this.enableCreate = true;
      this.editChapters = [];
      this.editTopics = [];
      this.editSubjects = [];
      this.selectedChapter = null;
      this.selectedSubject = null;
      this.showableSubjects = [];
      this.showableChapter = [];
      this.selectedGroup = null;
      this.selectedClass = null;
      this.enableCreateTopicSaveButton = true;
      this.enableCreateButtonSave = true;

    }

    this.showGroupButton = false;
    this.showClassButton = false;
    this.formenable = false;
    console.log('change Board', selectedBoard);
    this.selectedBoard = selectedBoard;
    if (this.selectedBoard.classes == null) {
      this.showClassButton = false;
    } else {
      this.showClassButton = true;
    }
  }

  getClassId(selectedClass, event) {
    if (selectedClass == null) {
      this.enableCreateTopic = true;
      this.enableCreate = true;
      this.editChapters = [];
      this.editTopics = [];
      this.showableSubjects = [];
      this.showableChapter = [];
      this.editSubjects = [];
      this.selectedChapter = null;
      this.formenable = false;
      this.selectedGroup = null;
      this.selectedChapter = null;
      this.selectedSubject = null;
      this.enableCreateTopicSaveButton = true;
      this.enableCreateButtonSave = true;
      this.showGroupButton = false;
    } else {
      // this.enableCreateTopic = false;
      //  this.enableCreate = false;
      this.editChapters = [];
      this.editTopics = [];
      this.showableSubjects = [];
      this.showableChapter = [];
      this.editSubjects = [];
      this.selectedChapter = null;
      this.formenable = false;
      this.selectedGroup = null;
      this.selectedChapter = null;
      this.selectedSubject = null;

      this.showGroupButton = true;
    }
    console.log('change Class', selectedClass);
    this.editSubjects = [];
    if (selectedClass === null) {
      this.editSubjects = [];
    } else {
      this.selectedClass = selectedClass;
      let boardId = this.selectedBoard.boardId;
      let classId = this.selectedClass.classId;
      if (selectedClass.hasGroups == false ) {
        this.formenable = true;
        this.showGroupButton = false;
        this.api.subject.get_withOut_groupId(boardId, classId).promise()
          .then(resp => {

            this.editSubjects = resp.body.Item.subjects;
            this.showableSubjects = _.cloneDeep(this.editSubjects);
            console.log('edit', this.editSubjects);
            console.log('showable', this.showableSubjects);
            // this.selectedSubject.subjectName = 'Select a Subject';
            let etag = resp.headers.get('etag');
            console.log('etag.............', etag);
            localStorage.setItem('etag', etag);
          })
          .catch(e => {
            try {
              const message = e.get('message');
              this.showMessage(false, message);
            } catch (e) {
              console.log('error', e);
            }
            this.editSubjects = [];
            this.showableSubjects = _.cloneDeep(this.editSubjects);

          });
      } else {

        this.showGroupButton = true;
      }
    }
  }

  newMethod(value) {
    // let data = localStorage.getItem('etagSelectGroupParams');


    if (value == 'null') {

      let boardId = this.selectedBoard.boardId;
      let classId = this.selectedClass.classId;

      this.api.subject.get_withOut_groupId(boardId, classId).promise()
        .then(resp => {

          let etag = resp.headers.get('etag');
          console.log('etag.............', etag);
          localStorage.setItem('etag', etag);
        });

    }
    else {

      let boardId = this.selectedBoard.boardId;
      let classId = this.selectedClass.classId;
      let groupId = this.selectedGroup.groupId;

      this.api.subject.get_with_groupId(boardId, classId, groupId).promise()
        .then(resp => {
          // this.editSubjects = resp.body.Item.subjects;
          // this.showableSubjects = _.cloneDeep(this.editSubjects);
          // console.log('edit ---', this.editSubjects);
          // console.log('showable ----', this.showableSubjects);
          let etag = resp.headers.get('etag');
          // console.log('console', resp);
          // console.log('etag----------->', etag);
          localStorage.setItem('etag', etag);
        });
    }




  }


  newMethod3(value) {

    let boardId = this.selectedBoard.boardId;
    let classId = this.selectedClass.classId;

    this.api.subject.get_withOut_groupId(boardId, classId).promise()
      .then(resp => {

        this.editSubjects = resp.body.Item.subjects;

        //m for duplicacy code//
        //   this.showableSubjects = _.cloneDeep(this.editSubjects);
        console.log("1", this.editSubjects);
        this.dummySubject = _.cloneDeep(this.editSubjects);
        console.log("2", this.dummySubject);
        if (value == "mainSave") {

          this.showableSubjects = _.cloneDeep(this.editSubjects);
          this.selectedSubject = null;
          this.selectedChapter = null;
        }

        else if (value == "delete") {
          this.selectedSubject.subjectName = localStorage.getItem("selectedSubject");
        }

        else if (value == "fromChapter") {
          // this.selectedSubject = JSON.parse(localStorage.getItem("selectedSubject"));
          // this.selectedSubject = this.subject;
          // console.log("one", this.selectedSubject);
          //selectedSubject=this.subject
        }

        console.log('edit ---', this.editSubjects);
        //  console.log('showable ----', this.showableSubjects);
        let etag = resp.headers.get('etag');
        console.log('console', resp);
        console.log('etag----------->', etag);
        localStorage.setItem('etag', etag);

      })
      .catch(e => {
        try {
          const message = e.get('message');
          this.showMessage(false, message);
        } catch (e) {
          console.log('error', e);
        }
        this.editSubjects = [];
        // this.showableSubjects = _.cloneDeep(this.editSubjects);

      });
  }


  newMethod2(value) {


    let boardId = this.selectedBoard.boardId;
    let classId = this.selectedClass.classId;
    let groupId = this.selectedGroup.groupId;

    this.api.subject.get_with_groupId(boardId, classId, groupId).promise()
      .then(resp => {
        this.editSubjects = resp.body.Item.subjects;
        console.log(this.editSubjects);
        //m for duplicacy code//

        //   this.showableSubjects = _.cloneDeep(this.editSubjects);
        console.log("1", this.editSubjects);
        this.dummySubject = _.cloneDeep(this.editSubjects);
        console.log("2", this.dummySubject);
        if (value == "mainSave") {

          this.showableSubjects = _.cloneDeep(this.editSubjects);
          this.selectedSubject = null;
          this.selectedChapter = null;
        }

        else if (value == "delete") {
          this.selectedSubject.subjectName = localStorage.getItem("selectedSubject");
        }

        else if (value == "fromChapter") {

          // this.selectedSubject = JSON.parse(localStorage.getItem("selectedSubject"));
          // this.selectedSubject = this.subject;
          // console.log("one", this.selectedSubject);
          //selectedSubject=this.subject
        }


        console.log('edit ---', this.editSubjects);
        //  console.log('showable ----', this.showableSubjects);
        let etag = resp.headers.get('etag');
        console.log('console', resp);
        console.log('etag----------->', etag);
        localStorage.setItem('etag', etag);
      })
      .catch(e => {
        try {
          const message = e.get('message');
          this.showMessage(false, message);
        } catch (e) {
          console.log('error', e);
        }
        this.editSubjects = [];
        // this.showableSubjects = _.cloneDeep(this.editSubjects);
      });
  }


  getGroupId(selectedGroup, event) {

    console.log('change group', selectedGroup);
    localStorage.setItem('etagSelectGroupParams', selectedGroup);
    this.editChapters = [];
    if (selectedGroup === null) {
      this.enableCreateTopic = true;
      this.enableCreate = true;
      this.editSubjects = [];
      this.editTopics = [];
      this.showableSubjects = [];
      this.showableChapter = [];
      this.formenable = false;
      this.selectedChapter = null;
      this.selectedSubject = null;
      this.enableCreateTopicSaveButton = true;
      this.enableCreateButtonSave = true;
    } else {
      this.formenable = true;
      this.selectedGroup = selectedGroup;
      let boardId = this.selectedBoard.boardId;
      let classId = this.selectedClass.classId;
      let groupId = this.selectedGroup.groupId;

      this.api.subject.get_with_groupId(boardId, classId, groupId).promise()
        .then(resp => {
          this.editSubjects = resp.body.Item.subjects;
          this.showableSubjects = _.cloneDeep(this.editSubjects);
          console.log('edit ---', this.editSubjects);
          console.log('showable ----', this.showableSubjects);
          let etag = resp.headers.get('etag');
          console.log('console', resp);
          console.log('etag----------->', etag);
          localStorage.setItem('etag', etag);
        })
        .catch(e => {
          try {
            const message = e.get('message');
            this.showMessage(false, message);
          } catch (e) {
            console.log('error', e);
          }
          this.editSubjects = [];
          this.showableSubjects = _.cloneDeep(this.editSubjects);
        });
    }
  }
  saveSubject() {

    if (this.editSubjects.length > 0) {
      const boardId = this.selectedBoard.boardId;
      const classId = this.selectedClass.classId;
      const data = this.editSubjects;
      if (this.selectedGroup != null) {
        const groupId = this.selectedGroup.groupId;
        this.api.subject.post_with_groupId(boardId, classId, groupId, data).promise()
          .then(resp => {
            this.newMethod("withGroupId");
            this.editChapters = [];
            this.editTopics = [];
            //this.selectedSubject=null;

            // let etag = resp.headers.get('etag');
            // localStorage.setItem('etag', etag);
            //  this.showableSubjects = Object.assign({}, this.editSubjects);
            const message = 'Save Success!';
            //    this.showableSubjects = _.cloneDeep(this.editSubjects);

            this.showMessage(true, message);
            this.newMethod2("mainSave");
          })
          .catch(e => {
            const message = e.get('message');
            this.showMessage(false, message);
          });
      } else {

        this.api.subject.post_withOut_groupId(boardId, classId, data).promise()
          .then(resp => {
            this.newMethod('null');
            this.editChapters = [];
            this.editTopics = [];
            this.selectedSubject = null;
            const message = 'Save Success!';
            // let etag = resp.headers.getItem('etag');
            // localStorage.setItem('etag', etag);
            this.showMessage(true, message);
            //  this.newMethod2("mainSave");
            this.newMethod3("mainSave");
          })
          .catch(e => {
            const message = e;
            this.showMessage(false, e);
          });
      }
    } else {
      return;
    }
  }
  addSubject() {

    this.newSubject = new Subject();
    this.showCreatedSubject = true;
    this.newSubject.subjectName = this.subject_Name.toUpperCase();
    console.log('name', this.subject_Name);
    this.newSubject.subjectId = UUID.UUID();
    let status = true;
    this.editSubjects.forEach(b => {
      if (b.subjectName.toLowerCase() === this.newSubject.subjectName.toLowerCase()) {
        const message = 'Duplicated "' + this.newSubject.subjectName + '" Name!';
        this.showMessage(false, message);
        console.log('------------>');
        status = false;
      }
    });


    if (!this.newSubject.subjectName.trim() || this.newSubject.subjectName.length === 0) {
      const message = 'Incorrect Subject Name!\n Please Insert a correct Subject Name';
      this.showMessage(false, message);
    } else if (status) {
      const message = 'Created "' + this.newSubject.subjectName + '" Name!';
      this.showMessage(true, message);
      this.editSubjects.push(this.newSubject);
      if (this.editSubjects.length > 5) {
        this.show = true;
      }
      this.enable = false;
    }
    this.subject_Name = '';
    console.log(this.editSubjects);
  }
  onSelectSubject(subject: Subject) {


    localStorage.setItem('selectedSubject', JSON.stringify(subject));
    this.editTopics = [];
    console.log(this.showableSubjects);
    console.log(this.selectedSubject);
    this.selectedChapter = null;
    //this.editTopics = [];
    this.showableChapter = [];

    console.log('showable----------->', this.showableSubjects);
    console.log('receive++++++++++++', subject);
    this.editChapters = [];
    this.enableCreate = false;
    this.selectedSubject = subject;
    this.editChapters = subject.chapters;
    this.showableChapter = _.cloneDeep(this.editChapters);
    if (typeof (this.editChapters) === 'undefined') {
      this.A = [];
    } else {
      let limit = 0;
      if (this.editChapters.length % 4) {
        limit = Math.floor(this.editChapters.length / 4 + 1);
      } else {
        limit = this.editChapters.length / 4;
      }
      this.A = [];
      for (let j = 0; j < limit; j++) {
        this.A.push(j);
      }
    }
    // this.newMethod2();
    console.log('chapters====>', this.editChapters);
  }
  editSubject(newSubject: Subject) {
    console.log(newSubject);
    this.updatableSubject = newSubject;
    this.showEditSubject = true;
  }
  onUpdateSubject(data) {
    let status = true;
    this.editSubjects.forEach(b => {
      if (b.subjectName.toLowerCase() === data.subjectName.toLowerCase() && b.subjectId !== data.subjectId) {
        const message = 'Duplicated "' + data.subjectName + '" Name!';
        this.showMessage(false, message);
        status = false;
      }
    });
    if (data.subjectName.trim() === '') {
      const message = 'Incorrect Subject Name!\n Please Insert a correct Subject Name';
      this.showMessage(false, message);
    } else if (status) {
      this.editSubjects.forEach(c => {
        if (c.subjectId === data.subjectId) {
          const message = 'Updated "' + data.subjectName + '" Name!';
          this.showMessage(true, message);
          c.subjectName = data.subjectName;
          this.enable = false;
        }
      });
    }
    this.showEditSubject = false;
  }
  onDeleteSubject(data) {
    this.showableSubjects = [];
    this.editChapters = [];

    for (let i = 0; i < this.editSubjects.length; i++) {
      if (this.editSubjects[i].subjectId === data.subjectId) {
        this.editSubjects = _.filter(this.editSubjects, g => g.subjectId !== data.subjectId);
        const message = 'Deleted "' + data.subjectId + '" Subject!';
        this.showMessage(true, message);
      }
    }
    this.enable = false;
    this.showEditSubject = false;
  }
  onClickAddChapter() {
    this.showCreateChapter = true;
  }
  createChapter(newChapter: Chapter) {

    this.validationChapter(newChapter);
  }
  validationChapter(data) {
    // this.editChapters = [];

    let status = true;
    console.log(this.editChapters);
    if (typeof (this.editChapters) === 'undefined') {
      console.log('null chapter', this.editChapters);
      //  this.editChapters = new Subject().chapters;
      this.editChapters = [];
      this.newChapter = Object.assign({}, data);
      this.editChapters.push(this.newChapter);
      const message = ' Created "' + data.chapterName + '"Chapter!';
      this.showMessage(true, message);
      this.showCreateChapter = false;
    } else {
      this.editChapters.forEach(b => {
        if (b.chapterName.toLowerCase() === data.chapterName.toLowerCase() && b.chapterId !== data.chapterId) {
          const message = 'Duplicated "' + data.chapterName + '"Name!';
          this.showMessage(false, message);
          status = false;
        }
      });
      if (!data.chapterName.trim() || data.chapterName.length === 0) {
        const message = 'Incorrect Subject Name!\n Please Insert a correct Chapter Name';
        this.showMessage(false, message);
      } else if (status) {
        this.showCreateChapter = false;
        const message = ' Created "' + data.chapterName + '"Chapter!';
        this.showMessage(true, message);

        this.enableCreateButtonSave = false;
        this.newChapter = Object.assign({}, data);
        this.editChapters.push(this.newChapter);
        let limit = 0;
        if (this.editChapters.length % 4) {
          limit = Math.floor(this.editChapters.length / 4 + 1);
        } else {
          limit = this.editChapters.length / 4;
        }
        this.A = [];
        for (let j = 0; j < limit; j++) {
          this.A.push(j);
        }
      }
    }
    let limit = 0;
    if (this.editChapters.length % 4) {
      limit = Math.floor(this.editChapters.length / 4 + 1);
    } else {
      limit = this.editChapters.length / 4;
    }
    this.A = [];
    for (let j = 0; j < limit; j++) {
      this.A.push(j);
    }
  }



  onSubmit() {
    console.log(this.showableSubjects);

    const boardId = this.selectedBoard.boardId;
    const classId = this.selectedClass.classId;
    const subjectId = this.selectedSubject.subjectId;
    // let name = this.selectedSubject.subjectName;
    // this.selectedSubject.subjectName = name;
    if (this.selectedGroup != null) {
      const groupId = this.selectedGroup.groupId;
      console.log('boardId', boardId);
      console.log('classId', classId);
      console.log('groupId', groupId);
      console.log('subjectId', subjectId);
      this.api.chapter.put_with_groupId(boardId, classId, groupId, subjectId, this.editChapters).promise()
        .then(resp => {
          console.log('response======>', resp);
          let etag = resp.headers.get('etag');
          console.log('etag with group', etag);
          localStorage.setItem('etag', etag);
          if (resp.body.Attributes) {
            this.editChapters = JSON.parse(JSON.stringify(resp.body.Attributes.subjects[0].chapters));
            localStorage.setItem("dropData", JSON.stringify(this.editChapters));
            this.showableChapter = _.cloneDeep(this.editChapters);
            const message = 'Save Success!';
            this.enableCreateButtonSave = true;

            this.editTopics = [];
            this.showMessage(true, message);
            this.newMethod2("fromChapter");
          }
        })
        .catch(e => {
          const message = e.get('message');
          this.showMessage(false, message);
          console.log('error:::::::>', e);
        });
    } else if (this.selectedGroup == null) {
      console.log('boardId', boardId);
      console.log('classId', classId);
      console.log('subjectId', subjectId);
      this.api.chapter.put_withOut_groupId(boardId, classId, subjectId, this.editChapters).promise()
        .then(resp => {
          console.log('============================>', resp.Attributes);
          let etag = resp.headers.get('etag');
          localStorage.setItem('etag', etag);
          if (resp.body.Attributes) {
            this.editChapters = JSON.parse(JSON.stringify(resp.body.Attributes.subjects[0].chapters));
            this.showableChapter = _.cloneDeep(this.editChapters);
            this.editTopics = [];
            const message = 'Save Success!';
            this.showMessage(true, message);

            this.newMethod3("fromChapter");
          }

          console.log('this is without resp+++>', this.editChapters);
          let limit = 0;
          if (this.editChapters.length % 4) {
            limit = Math.floor(this.editChapters.length / 4 + 1);
          } else {
            limit = this.editChapters.length / 4;
          }
          this.A = [];
          for (let j = 0; j < limit; j++) {
            this.A.push(j);
          }
        })
        .catch(e => {
          const message = e.get('message');
          this.showMessage(true, message);
          console.log('without error;;;;;;;;;;>', e);
        });
    }
  }

  ////////////////////////////
  dropFunc(val) {

    if (val.clientX != 0) {
      console.log("akash");
      if (this.dummySubject.length > 0) {
        this.showableSubjects = _.cloneDeep(this.dummySubject);
      }
      console.log("himanshu", this.showableSubjects);
    }
  }

  dropTopicData() {

  }


  onSelectChapter(chapter: Chapter) {

    if (chapter.chapterId == null) {
      this.enableCreateTopicSaveButton = true;

    }
    else {

    }

    console.log('select chatper', chapter);
    this.editTopics = [];
    this.enableCreateTopic = false;
    this.selectedChapter = chapter;
    this.editTopics = chapter.topics;
    if (typeof (this.editTopics) === 'undefined') {
      this.B = [];
    } else {
      let limit = 0;
      if (this.editTopics.length % 4) {
        limit = Math.floor(this.editTopics.length / 4 + 1);
      } else {
        limit = this.editTopics.length / 4;
      }
      this.B = [];
      for (let j = 0; j < limit; j++) {
        this.B.push(j);
      }
    }
    //this.newMethod2();
  }
  onRemoveChapter(chooseChapter: Chapter) {

    this.editTopics = [];
    // selectedSubject
    console.log('remove position', chooseChapter);
    this.editChapters = _.filter(this.editChapters, g => g.chapterId !== chooseChapter.chapterId);
    const message = 'Deleted "' + chooseChapter.chapterName + '" Chapter!';
    // this.newMethod2("delete");
    this.showMessage(true, message);
    this.enableCreateButtonSave = false;
  }
  editChapter(clickedChapter: Chapter) {
    console.log('----------->', clickedChapter);
    this.showEditChapter = true;
    this.editableChapter = clickedChapter;
  }
  updateChapter(chapter: Chapter) {
    let status = true;
    this.editChapters.forEach(b => {
      if (b.chapterId !== chapter.chapterId && b.chapterName.toLowerCase() === chapter.chapterName.toLowerCase()) {
        const message = 'Duplicated "' + chapter.chapterName + '" Name!';
        this.showMessage(false, message);
        status = false;
      }
    });
    if (chapter.chapterName.trim() === '') {
      const message = 'Incorrect Subject Name!\n Please Insert a correct Chapter Name';
      this.showMessage(false, message);
    } else if (status) {
      this.editChapters.forEach(c => {
        if (c.chapterId === chapter.chapterId) {
          const message = 'Updated "' + chapter.chapterName + '" Name!';
          this.showMessage(true, message);
          this.enableCreateButtonSave = false;
          c.chapterName = chapter.chapterName;
        }
      });
    }
    this.showEditChapter = false;
  }
  onClickAddTopic() {
    this.showCreateTopic = true;
  }
  onRemoveTopic(chooseTopic: Topic) {

    this.enableCreateTopicSaveButton = false;
      console.log(chooseTopic);
    this.editTopics = _.filter(this.editTopics, g => g.topicId !== chooseTopic.topicId);
    const message = 'Deleted "' + chooseTopic.topicName + '" Topic!';
    this.showMessage(true, message);
  }
  createTopic(newTopic: Topic) {
    this.validationTopic(newTopic);
  }
  validationTopic(data) {
    //this.editTopics = [];
    let status = true;
    if (typeof (this.editTopics) === 'undefined') {

      this.editTopics = [];
      this.newTopic = Object.assign({}, data);
      this.editTopics.push(this.newTopic);
      const message = ' Created "' + data.topicName + '"Chapter!';
      this.showMessage(true, message);
      this.showCreateTopic = false;
    } else {
      this.editTopics.forEach(b => {
        if (b.topicName.toLowerCase() === data.topicName.toLowerCase()) {
          const message = 'Duplicated "' + data.topicName + '"Name!';
          this.showMessage(false, message);
          status = false;
        }
      });
      if (!data.topicName.trim() || data.topicName.length === 0) {
        const message = 'Incorrect Topic Name!\n Please Insert a correct Topic Name';
        this.showMessage(false, message);
      } else if (status) {
        this.showCreateTopic = false;
        const message = ' Created "' + data.topicName + '"Topic!';
        this.showMessage(true, message);

        this.enableCreateTopicSaveButton = false;

        this.newTopic = Object.assign({}, data);
        this.editTopics.push(this.newTopic);
        let limit = 0;
        if (this.editTopics.length % 4) {
          limit = Math.floor(this.editTopics.length / 4 + 1);
        } else {
          limit = this.editTopics.length / 4;
        }
        this.B = [];
        for (let j = 0; j < limit; j++) {
          this.B.push(j);
        }
      }
    }
    let limit = 0;
    if (this.editTopics.length % 4) {
      limit = Math.floor(this.editTopics.length / 4 + 1);
    } else {
      limit = this.editTopics.length / 4;
    }
    this.B = [];
    for (let j = 0; j < limit; j++) {
      this.B.push(j);
    }
  }
  editTopic(topic: Topic) {
    console.log('clicked topic', topic);
    this.editableTopic = new Topic();
    this.editableTopic = topic;
    this.showEditTopic = true;
  }
  updateTopic(topic: Topic) {
    let status = true;
    this.editTopics.forEach(b => {
      if (b.topicName.toLowerCase() === topic.topicName.toLowerCase()) {
        const message = 'Duplicated "' + topic.topicName + '" Name!';
        this.showMessage(false, message);
        this.enableCreateTopicSaveButton = false;
        status = false;
      }
    });
    if (topic.topicName.trim() === '') {
      const message = 'Incorrect Subject Name!\n Please Insert a correct Topic Name';
      this.showMessage(false, message);
    } else if (status) {
      this.editTopics.forEach(c => {
        if (c.topicId === topic.topicId) {
          const message = 'Updated "' + topic.topicName + '" Name!';
          this.showMessage(true, message);
          c.topicName = topic.topicName;
        }
      });
    }
    this.showEditTopic = false;
  }
  onSaveTopic() {
    const boardId = this.selectedBoard.boardId;
    const classId = this.selectedClass.classId;
    const subjectId = this.selectedSubject.subjectId;
    const chapterId = this.selectedChapter.chapterId;
    if (this.selectedGroup != null) {
      const groupId = this.selectedGroup.groupId;
      console.log('boardId', boardId);
      console.log('classId', classId);
      console.log('groupId', groupId);
      console.log('subjectId', subjectId);
      console.log('chapterId', chapterId);
      this.api.topic.put_with_groupId(boardId, classId, groupId, subjectId, chapterId, this.editTopics).promise()
        .then(resp => {
          console.log('response======>', resp);
          if (resp.body.Attributes) {
            console.log('************>', resp);
            //this.editTopics = resp.body.Attributes.subjects.chapters.topics;
            //this.editSubjects = resp.body.Item.subjects;
            //     this.editChapters = JSON.parse(JSON.stringify(resp.body.Attributes.subjects[0].chapters));

            // this.editTopics = resp.body.Attributes.subjects.chapters.topics;
            let etag = resp.headers.get('etag');
            localStorage.setItem('etag', etag);
            const message = 'Save Success!';
            this.enableCreateTopicSaveButton = true;
            this.showMessage(true, message);
            this.newMethod2("fromTopic");
          }

        })
        .catch(e => {
          const message = e.get('message');
          this.showMessage(false, message);
          console.log('error:::::::>', e);
        });
    } else if (this.selectedGroup == null) {
      console.log('boardId', boardId);
      console.log('classId', classId);
      console.log('subjectId', subjectId);
      this.api.topic.put_withOut_groupId(boardId, classId, subjectId, chapterId, this.editTopics).promise()
        .then(resp => {
          console.log('============================>', resp.Attributes);
          let etag = resp.headers.get('etag');
          localStorage.setItem('etag', etag);
          const message = 'Save Success!';
          this.showMessage(true, message);
          this.newMethod3("fromTopic");
          console.log('this is without resp+++>', this.editTopics);
          let limit = 0;
          if (this.editTopics.length % 4) {
            limit = Math.floor(this.editTopics.length / 4 + 1);
          } else {
            limit = this.editTopics.length / 4;
          }
          this.A = [];
          for (let j = 0; j < limit; j++) {
            this.A.push(j);
          }
        })
        .catch(e => {
          const message = e.get('message');
          this.showMessage(true, message);
          console.log('without error;;;;;;;;;;>', e);
        });
    }
  }
  onCloseDialog() {
    this.showCreateChapter = false;
    this.showCreateTopic = false;
    this.showEditChapter = false;
    this.showEditTopic = false;
  }
  showMessage(isSuccess: boolean, message) {
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

  public popoverTitle: string = 'Confirm';
  public popoverMessage: string = 'Are you sure?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
}

