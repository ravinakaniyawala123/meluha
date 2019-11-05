import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Board } from '../../model/board';
import { Message } from "primeng/api";
import { Subject } from '../../model/subject';
import { ClassGroup } from "../../model/classgroup";
import { Group } from "../../model/group";
import { Chapter } from "../../model/chapter";
import { Topic } from "../../model/topic";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UUID } from "angular2-uuid";


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})

export class FeatureComponent implements OnInit {
  boards: Board[];
  cities: City[];
  searchText = "";
  subjects: Subject[];
  selectedCity: City;
  msgs: Message[] = [];
  drop = false;
  chapterDrop = false;
  selectedBoard: Board;
  selectedClass: ClassGroup;
  selectedGroup: Group;
  selectedSubject: Subject;
  selectedChapter: Chapter;
  selectedTopic: Topic;
  subjectArrayFromDrop = [];
  chapterArrayFromDrop = [];
  editableSubjects = [];
  apiCallArrayofSubjectName = [];
  apiCallArrayofChapterName = [];
  chapter123: any;
  subjectArrayFromDrop2 = [];
  chapterNamesApiCalling = [];
  uuidParam: string;
  packageName: string;

  packageBase: any;
  packageBaseDiscussion: any;
  packageBaseDiscussionTutor: any;

  pacakageCode: number;
  selectedotherInclusions = [];
  pacakageData: any;
  subjectDropDown = false;
  isChecked1 = false;
  isChecked2 = false;
  isChecked3 = false;
  isChecked4 = false;
  isChecked5 = false;
  isChecked6 = false;
  isChecked7 = false;
  isChecked8 = false;
  pacakageButton = true;
  editBtn = true;
  btnSave = true;
  createPacakge: { "packageCode": number; "packageId": string; "packagedName": string; "contentInclusions": { "boards": string[]; "clases": string[]; "groups"?: string[]; "subjects": any[]; "chapters": any[]; }; "otherInclusions": any[]; "basePackagePrice": any; "basePrice_discussion": any; "basePrice_discussion_tutor": any; };
  editData: any;
  packageDuplicacy: string;

  constructor(private api: ApiService, private http: HttpClient) {

  }

  ngOnInit() {

    this.getBoards();
    this.getPacakge();
  }

  getPacakge() {
    return new Promise(resolve => {

      this.http.get('https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/package', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .subscribe(data => {
          this.pacakageData = data;
          console.log(this.pacakageData);
          resolve(data);
        })

    });

  }


  getBoards() {

    this.api.organization.gets().promise()
      .then(resp => {
        const body = resp.body;
        const ifmatch = resp.headers.get('ifmatch');
        localStorage.setItem('etag', resp.headers.get('etag'));
        if (!body.Attributes) {
          this.boards = body.Item.boards;
          console.log(this.boards);
        }
      })
      .catch(e => {
        this.showMessage(true, 'Connection error!');
      });
  }

  getBoardId(selectedBoard, event) {
    this.selectedBoard = selectedBoard;

    if (this.selectedBoard == null) {

      this.isChecked1 = false;
      this.isChecked2 = false;
      this.isChecked3 = false;
      this.isChecked4 = false;
      this.isChecked5 = false;
      this.isChecked6 = false;
      this.isChecked7 = false;
      this.isChecked8 = false;


      this.subjects = [];
      this.subjectArrayFromDrop = [];
      this.subjectDropDown = false;
      this.selectedSubject = null;
      this.selectedChapter = null;
      this.selectedTopic = null;
      this.subjects = null;
      this.selectedGroup = null;
      this.editBtn = true;
      this.packageName = '';
      this.packageBase = null;
      this.packageBaseDiscussion = null;
      this.packageBaseDiscussionTutor = null;
      this.btnSave = true;
      this.pacakageButton = true;
    }
    else {
      this.selectedClass = null;
      this.selectedGroup = null;
      this.selectedSubject = null;
      this.selectedChapter = null;
      this.selectedTopic = null;
      this.subjects = null;
    }
  }

  getClassId(selectedClass, event) {
    this.selectedClass = selectedClass;


    if (this.selectedClass == null) {

      this.isChecked1 = false;
      this.isChecked2 = false;
      this.isChecked3 = false;
      this.isChecked4 = false;
      this.isChecked5 = false;
      this.isChecked6 = false;
      this.isChecked7 = false;
      this.isChecked8 = false;


      this.selectedSubject = null;
      this.selectedChapter = null;
      this.selectedTopic = null;
      this.subjects = null;
      this.selectedGroup = null;
      this.editBtn = true;
      this.packageName = '';
      this.packageBase = null;
      this.packageBaseDiscussion = null;
      this.packageBaseDiscussionTutor = null;
      this.btnSave = true;
      this.pacakageButton = true;
      this.subjects = [];
      this.subjectArrayFromDrop = [];
      this.subjectDropDown = false;
    }

    let boardId = this.selectedBoard.boardId;
    let classId = this.selectedClass.classId;
    this.selectedGroup = null;
    this.selectedSubject = null;
    this.selectedChapter = null;
    this.selectedTopic = null;
    this.subjects = null;
    if (!selectedClass.hasGroups) {

      this.api.subject.get_withOut_groupId(boardId, classId).promise()
        .then(resp => {
          this.subjects = resp.body.Item.subjects;
          // this.subjects.forEach(element => {
          //   element.selected = false;
          // });  
          this.subjects.forEach(element => {
            element.selected = false;
            element.chapters.forEach(ch => {
              ch.selected = false;
              let colour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
              ch.colour = colour;
            });
          });
          console.log(this.subjects);
          this.drop = true;
          this.editBtn = false;
          this.subjectDropDown = true;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  getGroupId(selectedGroup, event) {

    this.selectedGroup = selectedGroup;
    if (this.selectedGroup == null) {

      this.isChecked1 = false;
      this.isChecked2 = false;
      this.isChecked3 = false;
      this.isChecked4 = false;
      this.isChecked5 = false;
      this.isChecked6 = false;
      this.isChecked7 = false;
      this.isChecked8 = false;


      this.subjects = [];
      this.subjectArrayFromDrop = [];
      this.subjectDropDown = false;
      this.selectedSubject = null;
      this.selectedChapter = null;
      this.selectedTopic = null;
      this.subjects = null;
      this.editBtn = true;
      this.packageName = '';
      this.packageBase = null;
      this.packageBaseDiscussion = null;
      this.packageBaseDiscussionTutor = null;
      this.btnSave = true;
      this.pacakageButton = true;
    }

    const boardId = this.selectedBoard.boardId;
    const classId = this.selectedClass.classId;
    const groupId = this.selectedGroup.groupId;
    this.selectedSubject = null;
    this.selectedChapter = null;
    this.selectedTopic = null;
    this.subjects = null;

    if (groupId !== null) {
      this.api.subject.get_with_groupId(boardId, classId, groupId).promise()
        .then(resp => {

          this.subjects = resp.body.Item.subjects;
          // this.subjects.forEach(element => {
          //   element.selected = false;
          //   element.chapters.forEach(ch => {
          //     ch.selected = false;
          //   });
          // });
          this.subjects.forEach(element => {
            element.selected = false;
            element.chapters.forEach(ch => {
              ch.selected = false;
              let colour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
              ch.colour = colour;
            });
          });

          this.drop = true;
          this.editBtn = false;
          this.subjectDropDown = true;

        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  // onChange(subject: any, subjectArray, isChecked: boolean) {
  //   

  //   if (isChecked) {
  //     this.editableSubjects.push(subjectArray);
  //     this.chapterDrop = true;
  //     // for (let i in subject) {
  //     //   this.subjectArrayFromDrop.push(subject[i]);
  //     // }

  //   } else {

  //     // var index1: number = this.editableSubjects.indexOf(subjectArray);
  //     // if (index !== -1) {
  //     //   this.editableSubjects.splice(index1, 1);
  //     // }

  //     // for (let i = 0; i < this.subjectArrayFromDrop.length; i++) {

  //     //   for (let j = 0; j < subject.length; j++) {
  //     //     if (this.subjectArrayFromDrop[i].chapterId == subject[j].chapterId) {
  //     //       var index: number = this.subjectArrayFromDrop.indexOf(subject[j]);
  //     //       if (index !== -1) {
  //     //         this.subjectArrayFromDrop.splice(index, 1);
  //     //       }
  //     //     }

  //     //   } 
  //    // }

  //   }
  // }

  onSubjectChange(subject, isChecked: boolean) {

    this.subjectArrayFromDrop = this.subjects.filter(x => x.selected == true);
    if (this.subjectArrayFromDrop.length == 0) {

      this.btnSave = true;
    }
    else {
      this.btnSave = false;
    }



    // if (isChecked) {

    //   for (let i = 0; i < this.subjectArrayFromDrop.length; i++) {

    //     if (this.apiCallArrayofSubjectName.length == 0) {
    //       this.apiCallArrayofSubjectName.push(subject.subjectName);
    //     }
    //     else {

    //       for (let j = 0; j < this.apiCallArrayofSubjectName.length; j++) {

    //         if (this.subjectArrayFromDrop[i].subjectName != this.apiCallArrayofSubjectName[j]) {

    //           this.apiCallArrayofSubjectName.push(subject.subjectName);
    //         }

    //       }

    //     }

    //   }
    // }
    // else {
    //   var index: number = this.apiCallArrayofSubjectName.indexOf(subject.subjectName);
    //   if (index !== -1) {
    //     this.apiCallArrayofSubjectName.splice(index, 1);
    //   }
    // }
  }
  onChapterSelect(chapter, isChecked: boolean) {




    // 
    // if (isChecked) {


    //   for (let i = 0; i < this.subjectArrayFromDrop.length; i++) {
    //     this.chapter123 = this.subjectArrayFromDrop[i].chapters;

    //   }
    //   let abcd = this.chapter123.filter(x => x.selected == true);

    // for (let j = 0; j < abcd.length; j++) {

    //   if (this.apiCallArrayofChapterName.length == 0) {
    //     this.apiCallArrayofChapterName.push(chapter.chapterName);
    //   }

    //   else {

    //     for (let k = 0; k < this.apiCallArrayofChapterName.length; k++) {

    //       if (abcd[j].chapterName != this.apiCallArrayofChapterName[k]) {

    //         this.apiCallArrayofChapterName.push(chapter.chapterName);
    //       }

    //     }

    //   }
    // }

    // }
    // else {

    //   var index: number = this.apiCallArrayofSubjectName.indexOf(chapter.chapterName);
    //   if (index !== -1) {
    //     this.apiCallArrayofSubjectName.splice(index, 1);
    //   }


    // }

  }


  // onChapterChange() {
  //   
  //   this.subjectArrayFromDrop = this.subjects.filter(x => x.selected == true);
  // }

  select1(name, ischecked: boolean) {
    if (ischecked) {
      this.selectedotherInclusions.push(name);
    }
    else {
      const index = this.selectedotherInclusions.indexOf(name);
      if (index !== -1) {
        this.selectedotherInclusions.splice(index, 1);
      }
    }
  }

  delete(Item) {

    return new Promise(resolve => {

      this.http.delete(`https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/package/${Item.packageId}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .subscribe(data => {
          this.getPacakge();
          resolve(data);
        })
    });



  }



  edit(particularChapter) {

    this.btnSave = false;
    debugger;
    this.editData = particularChapter;
    this.isChecked1 = false;
    this.isChecked2 = false;
    this.isChecked3 = false;
    this.isChecked4 = false;
    this.isChecked5 = false;
    this.isChecked6 = false;
    this.isChecked7 = false;
    this.isChecked8 = false;

    this.subjects.forEach(element => {
      element.selected = false;
      element.chapters.forEach(ch => {
        ch.selected = false;
      });
    });

    console.log(particularChapter);
    debugger;
    this.packageName = particularChapter.packagedName;
    this.packageBase = particularChapter.basePackagePrice;
    this.packageBaseDiscussion = particularChapter.basePrice_discussion;
    this.packageBaseDiscussionTutor = particularChapter.basePrice_discussion_tutor;

    let otherinclusion = particularChapter.otherInclusions;

    otherinclusion.forEach(element0 => {
      if (element0 == 'Activities') {
        this.isChecked1 = true;
      }
      else if (element0 == 'Forums') {
        this.isChecked2 = true;
      }
      else if (element0 == 'Blogs') {
        this.isChecked3 = true;
      }
      else if (element0 == 'Friends') {
        this.isChecked4 = true;
      }
      else if (element0 == 'Chat box') {
        this.isChecked5 = true;
      }
      else if (element0 == 'Meluha Secret shop and Meluha Money') {
        this.isChecked6 = true;
      }
      else if (element0 == 'Virtual Classroom') {
        this.isChecked7 = true;
      }
      else if (element0 == 'Alerts, News and Notifications') {
        this.isChecked8 = true;
      }

    })

    let arrays = particularChapter.contentInclusions;
    console.log(arrays);


    arrays.subjects.forEach(element1 => {
      console.log(element1);

      this.subjects.forEach(element2 => {

        if (element1 == element2.subjectName) {
          element2.selected = true;

          arrays.chapters.forEach(element4 => {

            element2.chapters.forEach(element3 => {
              if (element4 == element3.chapterName) {
                element3.selected = true;
              }
            });

          })

        }

      });

    });

    this.subjectArrayFromDrop = this.subjects.filter(x => x.selected == true);

    // this.subjects.forEach(element => {
    //   element.selected = false;
    //   element.chapters.forEach(ch => {
    //     ch.selected = false;
    //   });
    // });
  }

  save() {

    if (this.editData == undefined) {

      this.pacakageCode = Math.floor(Math.random() * 100) + 1;
      this.uuidParam = UUID.UUID();
      this.apiCallArrayofSubjectName = [];
      this.apiCallArrayofChapterName = [];
      this.chapterNamesApiCalling = [];
      console.log(this.subjectArrayFromDrop);

      this.subjectArrayFromDrop = this.subjects.filter(x => x.selected == true);

      for (let i = 0; i < this.subjectArrayFromDrop.length; i++) {
        this.apiCallArrayofSubjectName.push(this.subjectArrayFromDrop[i].subjectName);
      }
      console.log(this.apiCallArrayofSubjectName);


      for (let i = 0; i < this.subjectArrayFromDrop.length; i++) {
        if (this.subjectArrayFromDrop[i].selected == true) {
          this.apiCallArrayofChapterName.push(this.subjectArrayFromDrop[i].chapters);
        }
      }
      console.log(this.apiCallArrayofChapterName);
      this.subjectArrayFromDrop2 = this.apiCallArrayofChapterName[0].filter(x => x.selected == true);
      console.log(this.subjectArrayFromDrop2);

      for (let i = 0; i < this.subjectArrayFromDrop2.length; i++) {
        this.chapterNamesApiCalling.push(this.subjectArrayFromDrop2[i].chapterName);
      }

      if (this.chapterNamesApiCalling != null) {

        if (this.packageBase == null || this.packageBase == undefined) {
          const message = 'Package Base Price Cannot Be Empty';
          this.showMessage(true, message);
        }

        if (this.packageBaseDiscussion == null || this.packageBaseDiscussion == undefined) {
          const message = 'Discussion Base Price Cannot Be Empty';
          this.showMessage(true, message);
        }

        if (this.packageBaseDiscussionTutor == null || this.packageBaseDiscussionTutor == undefined) {
          const message = 'Tutor Price Cannot Be Empty';
          this.showMessage(true, message);
        }


        if (this.packageName == undefined) {
          const message = 'Package Name!\n Cannot Be Empty';
          this.showMessage(true, message);
        }
        else if (!this.packageName.trim() || this.packageName.length === 0) {
          const message = 'Incorrect Package Name!\n Please Insert a correct Package Name';
          this.showMessage(true, message);
        }


        else {

          for (let i = 0; i < this.pacakageData.length; i++) {
            if (this.pacakageData[i].packagedName == this.packageName.toUpperCase() || this.pacakageData[i].packagedName == this.packageName) {
              this.packageDuplicacy = 'duplicate';
              const message = 'Package Name is duplicate';
              this.showMessage(true, message);
              break;
            } else {
              this.packageDuplicacy = 'null';
            }
          }

          // this.pacakageData.forEach(element => {
          //   if (element.packagedName == this.packageName.toUpperCase()) {
          //     this.packageDuplicacy = 'duplicate';
          //     const message = 'Package Name is duplicate';

          //     this.showMessage(true, message);
          //   }
          //   else {
          //     this.packageDuplicacy = 'null';
          //   }

          // });


          if (this.packageDuplicacy != 'duplicate' && this.packageBase != null && this.packageBaseDiscussion != null && this.packageBaseDiscussionTutor != null) {
            const message = 'Created "' + this.packageName + '" Name!';
            this.showMessage(true, message);
            this.pacakageButton = false;

            if (this.selectedGroup == null) {
              this.createPacakge = {

                "packageCode": this.pacakageCode,
                "packageId": this.uuidParam,
                "packagedName": this.packageName,
                "contentInclusions": {
                  "boards": [this.selectedBoard.boardName],
                  "clases": [this.selectedClass.className],
                  "subjects": this.apiCallArrayofSubjectName,
                  "chapters": this.chapterNamesApiCalling
                },
                "otherInclusions": this.selectedotherInclusions,
                "basePackagePrice": this.packageBase,
                "basePrice_discussion": this.packageBaseDiscussion,
                "basePrice_discussion_tutor": this.packageBaseDiscussionTutor,

              }
            }
            else {
              this.createPacakge = {

                "packageCode": this.pacakageCode,
                "packageId": this.uuidParam,
                "packagedName": this.packageName,
                "contentInclusions": {
                  "boards": [this.selectedBoard.boardName],
                  "clases": [this.selectedClass.className],
                  "groups": [this.selectedGroup.groupName],
                  "subjects": this.apiCallArrayofSubjectName,
                  "chapters": this.chapterNamesApiCalling
                },
                "otherInclusions": this.selectedotherInclusions,
                "basePackagePrice": this.packageBase,
                "basePrice_discussion": this.packageBaseDiscussion,
                "basePrice_discussion_tutor": this.packageBaseDiscussionTutor,

              }
            }


          }
        }

      }
      else {

        const message = 'Please Select Chapters';
        this.showMessage(true, message);
      }
    }
    else {

      let boards = this.editData.contentInclusions.boards;
      let chapters = this.editData.contentInclusions.chapters;
      let clases = this.editData.contentInclusions.clases;
      let groups = this.editData.contentInclusions.groups;
      let subjects = this.editData.contentInclusions.subjects;

      this.pacakageCode = this.editData.packageCode;
      this.uuidParam = this.editData.packageId;
      this.apiCallArrayofSubjectName = [];
      this.apiCallArrayofChapterName = [];
      this.chapterNamesApiCalling = [];
      console.log(this.subjectArrayFromDrop);

      this.subjectArrayFromDrop = this.subjects.filter(x => x.selected == true);

      for (let i = 0; i < this.subjectArrayFromDrop.length; i++) {
        this.apiCallArrayofSubjectName.push(this.subjectArrayFromDrop[i].subjectName);
      }
      console.log(this.apiCallArrayofSubjectName);


      for (let i = 0; i < this.subjectArrayFromDrop.length; i++) {
        if (this.subjectArrayFromDrop[i].selected == true) {
          this.apiCallArrayofChapterName.push(this.subjectArrayFromDrop[i].chapters);
        }
      }
      console.log(this.apiCallArrayofChapterName);
      this.subjectArrayFromDrop2 = this.apiCallArrayofChapterName[0].filter(x => x.selected == true);
      console.log(this.subjectArrayFromDrop2);

      for (let i = 0; i < this.subjectArrayFromDrop2.length; i++) {
        this.chapterNamesApiCalling.push(this.subjectArrayFromDrop2[i].chapterName);
      }

      console.log(this.chapterNamesApiCalling);
      console.log(this.uuidParam);
      console.log(this.packageName);
      console.log(this.pacakageCode);

      if (this.chapterNamesApiCalling != null) {

        if (this.packageBase == null || this.packageBase == undefined) {
          const message = 'Package Base Price Cannot Be Empty';
          this.showMessage(true, message);
        }

        if (this.packageBaseDiscussion == null || this.packageBaseDiscussion == undefined) {
          const message = 'Discussion Base Price Cannot Be Empty';
          this.showMessage(true, message);
        }

        if (this.packageBaseDiscussionTutor == null || this.packageBaseDiscussionTutor == undefined) {
          const message = 'Tutor Price Cannot Be Empty';
          this.showMessage(true, message);
        }

        if (this.packageName == undefined) {
          const message = 'Package Name!\n Cannot Be Empty';
          this.showMessage(true, message);
        }
        else if (!this.packageName.trim() || this.packageName.length === 0) {
          const message = 'Incorrect Package Name!\n Please Insert a correct Package Name';
          this.showMessage(true, message);
        }
        else {


          // for (let i = 0; i < this.pacakageData.length; i++) {
          //   if (this.pacakageData[i].packagedName == this.packageName.toUpperCase() || this.pacakageData[i].packagedName == this.packageName) {
          //     this.packageDuplicacy = 'duplicate';
          //     const message = 'Package Name is duplicate';
          //     this.showMessage(true, message);
          //     break;
          //   } else {
          //     this.packageDuplicacy = 'null';
          //   }
          // }



          const message = 'Created "' + this.packageName + '" Name!';
          this.showMessage(true, message);
          this.pacakageButton = false;



          if (this.selectedGroup == null) {
            this.createPacakge = {

              "packageCode": this.pacakageCode,
              "packageId": this.uuidParam,
              "packagedName": this.packageName,
              "contentInclusions": {
                "boards": [this.selectedBoard.boardName],
                "clases": [this.selectedClass.className],
                "subjects": this.apiCallArrayofSubjectName,
                "chapters": this.chapterNamesApiCalling
              },
              "otherInclusions": this.selectedotherInclusions,
              "basePackagePrice": this.packageBase,
              "basePrice_discussion": this.packageBaseDiscussion,
              "basePrice_discussion_tutor": this.packageBaseDiscussionTutor,

            }
          }
          else {
            this.createPacakge = {

              "packageCode": this.pacakageCode,
              "packageId": this.uuidParam,
              "packagedName": this.packageName,
              "contentInclusions": {
                "boards": [this.selectedBoard.boardName],
                "clases": [this.selectedClass.className],
                "groups": [this.selectedGroup.groupName],
                "subjects": this.apiCallArrayofSubjectName,
                "chapters": this.chapterNamesApiCalling
              },
              "otherInclusions": this.selectedotherInclusions,
              "basePackagePrice": this.packageBase,
              "basePrice_discussion": this.packageBaseDiscussion,
              "basePrice_discussion_tutor": this.packageBaseDiscussionTutor,

            }
          }



        }
      }
      else {
        const message = 'Please Select Chapters';
        this.showMessage(true, message);
      }
    }



  }

  proceedToSave() {


    // let him = {

    //   contentInclusions: {
    //     boards: ["up board"],
    //     chapters: ["First Chapter"],
    //     classes: ["class 9"],
    //     groups: ["Group A"],
    //     subjects: ["THIRD SUBJECT", "SECOND SUBJECT"]
    //   },
    //   otherInclusions: ["khghj"],
    //   packageCode: 27,
    //   packageId: "146322ff-e269-e399-a1b2-fa9c89a73766",
    //   packagedName: "pacakage 4",
    //   packagePicture: ["package2"],
    //   basePackagePrice: "400",
    //   basePrice_discussion: "550",
    //   basePrice_discussion_tutor: "780"
    // }


    if (this.editData == undefined) {
      return new Promise(resolve => {

        this.http.post('https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/package', this.createPacakge, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
          .subscribe(data => {
            console.log(data);
            this.getPacakge();
            this.isChecked1 = false;
            this.isChecked2 = false;
            this.isChecked3 = false;
            this.isChecked4 = false;
            this.isChecked5 = false;
            this.isChecked6 = false;
            this.isChecked7 = false;
            this.isChecked8 = false;
            this.pacakageButton = true;
            this.apiCallArrayofSubjectName = [];
            this.chapterNamesApiCalling = [];
            this.subjectArrayFromDrop = [];
            this.packageName = '';
            this.packageBase = null;
            this.packageBaseDiscussion = null;
            this.packageBaseDiscussionTutor = null;
            this.subjects.forEach(element => {
              element.selected = false;
              element.chapters.forEach(element => {
                element.selected = false;
              });
            });

            resolve(data);
          })
      });

    }
    else {
      return new Promise(resolve => {

        this.http.put(`https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/package/${this.uuidParam}`, this.createPacakge, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
          .subscribe(data => {
            console.log(data);
            this.getPacakge();
            this.isChecked1 = false;
            this.isChecked2 = false;
            this.isChecked3 = false;
            this.isChecked4 = false;
            this.isChecked5 = false;
            this.isChecked6 = false;
            this.isChecked7 = false;
            this.isChecked8 = false;
            this.pacakageButton = true;
            this.apiCallArrayofSubjectName = [];
            this.chapterNamesApiCalling = [];
            this.subjectArrayFromDrop = [];
            this.packageName = '';
            this.packageBase = null;
            this.packageBaseDiscussion = null;
            this.packageBaseDiscussionTutor = null;
            this.subjects.forEach(element => {
              element.selected = false;
              element.chapters.forEach(element => {
                element.selected = false;
              });
            });

            resolve(data);
          })
      });


    }


    // this.pacakageData.forEach(element => {
    //   if (element.packagedName == this.packageName){

    //   }
    // })

    // UUID


  }




  // for (let i = 0; i < this.editableSubjects.length; i++) {
  //   var chapter = this.editableSubjects[i].chapters;

  //   for (let j = 0; j < chapter.length; j++) {

  //     for (let k = 0; k < this.chapterArrayFromDrop.length; k++) {

  //       if (chapter[j].chapterId == this.editableSubjects[j].chapters[j].chapterId) {
  //         console.log(this.editableSubjects[j].chapters[j].chapterId);

  //         const index = this.editableSubjects.indexOf(this.editableSubjects[j].chapters[j]);
  //         if (index !== -1) {
  //           this.editableSubjects.splice(index, 1);
  //         }

  //       }

  //     }
  //   }  
  // }
  // console.log(this.editableSubjects);





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


}




