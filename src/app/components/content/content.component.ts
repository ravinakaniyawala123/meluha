import { Component, OnInit } from '@angular/core';
import { Board } from '../../model/board';
import { Subject } from '../../model/subject';
import { ApiService } from '../../api/api.service';
import { ClassGroup } from "../../model/classgroup";
import { Group } from "../../model/group";
import { Chapter } from "../../model/chapter";
import { Topic } from "../../model/topic";
import { FContent } from "../../model/fcontent";
import { Message, MessageService } from "primeng/api";
import { Presigned } from "../../model/presigned";
import { HttpClient } from '@angular/common/http';
import { UUID } from "angular2-uuid";
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { Row } from 'primeng/primeng';
import { RequestOptions, Http } from '@angular/http'
import { Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  boards: Board[];
  subjects: Subject[];
  fContents: FContent[];
  msgs: Message[] = [];

  //It is for manipulating selected elements

  selectedBoard: Board;
  selectedClass: ClassGroup;
  selectedGroup: Group;
  selectedSubject: Subject;
  selectedChapter: Chapter;
  selectedTopic: Topic;

  //It is for showing contents

  videos: FContent[];
  ppts: FContent[];
  pdfs: FContent[];
  quizes: FContent[];

  selectedVideo: FContent;
  selectedPPT: FContent;
  selectedPDF: FContent;
  selectedQuiz: FContent;


  //for showing table

  videocols: [{ field: 'contentName', header: 'Video' }];
  pptcols: [{ field: 'contentName', header: 'Video' }];
  pdfcols: [{ field: 'contentName', header: 'Video' }];
  quizcols: [{ field: 'contentName', header: 'Video' }];

  //for uploading files

  presigned: Presigned;
  viewBindingVar: any;
  selectedFileNew: any;
  uploadSucessVideo: boolean;
  uploadSucessPdf: boolean;
  uploadSucessPpt: boolean;
  showPopup: boolean;
  nameofFileOnPopUp: any;
  contentTypeOnPopUP: any;
  contentIdOnPopUP: any;
  contentNameOnPopUP: any;
  contentResourceOnPopUP: any;
  contentStorageBucketNameOnPopUP: any;
  contentStorageKeyPopUP: any;
  worksheet: XLSX.WorkSheet;
  jsonsheet: {}[];
  newJsonSheet = [];
  bulkSelect: boolean;
  bulkUploadButton: boolean;
  key: any;
  bulkUploadFile: Object;
  missingFilesArray = false;


  constructor(private api: ApiService,
    private http: Http,
    private spinner: NgxSpinnerService,
    private httpp: HttpClient) { }

  ngOnInit() {
    this.bulkUploadButton = true;
    this.bulkSelect = true;
    this.uploadSucessVideo = true;
    this.uploadSucessPdf = true;
    this.uploadSucessPpt = true;

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
        this.showMessage(false, 'Connection error!');
      });
  }

  getBoardId(selectedBoard, event) {
    this.selectedBoard = selectedBoard;

    if (this.selectedBoard == null) {
      this.missingFilesArray = false;
      this.fContents = [];
      this.videos = []
      this.ppts = [];
      this.pdfs = [];
      this.selectedSubject = null;
      this.selectedChapter = null;
      this.selectedTopic = null;
      this.subjects = null;
      this.selectedGroup = null;
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
    this.fContents = [];
    this.videos = []
    this.ppts = [];
    this.pdfs = [];

    if (this.selectedClass == null) {
      this.missingFilesArray = false;
      this.selectedSubject = null;
      this.selectedChapter = null;
      this.selectedTopic = null;
      this.subjects = null;
      this.selectedGroup = null;
    }


    let boardId = this.selectedBoard.boardId;
    let classId = this.selectedClass.classId;
    this.selectedGroup = null;
    this.selectedSubject = null;
    this.selectedChapter = null;
    this.selectedTopic = null;
    this.subjects = null;
    if (selectedClass.hasGroups == false) {

      this.api.subject.get_withOut_groupId(boardId, classId).promise()
        .then(resp => {
          this.subjects = resp.body.Item.subjects;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  getGroupId(selectedGroup, event) {
    this.fContents = [];
    this.videos = []
    this.ppts = [];
    this.pdfs = [];
    this.selectedGroup = selectedGroup;
    if (this.selectedGroup == null) {
      this.missingFilesArray = false;
      this.selectedSubject = null;
      this.selectedChapter = null;
      this.selectedTopic = null;
      this.subjects = null;

    }


    let boardId = this.selectedBoard.boardId;
    let classId = this.selectedClass.classId;
    let groupId = this.selectedGroup.groupId;
    this.selectedSubject = null;
    this.selectedChapter = null;
    this.selectedTopic = null;
    this.subjects = null;
    if (groupId !== null) {
      this.api.subject.get_with_groupId(boardId, classId, groupId).promise()
        .then(resp => {
          this.subjects = resp.body.Item.subjects;

        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  getSubjectId(selectedSubject, event) {
    this.selectedSubject = selectedSubject;

    this.fContents = [];
    this.videos = []
    this.ppts = [];
    this.pdfs = [];

    if (this.selectedSubject == null) {
      this.missingFilesArray = false;
      this.selectedChapter = null;
      this.selectedTopic = null;
    }

    this.selectedChapter = null;
    this.selectedTopic = null;

  }

  getChapterId(selectedChapter, event) {

    this.selectedChapter = selectedChapter;

    this.fContents = [];
    this.videos = []
    this.ppts = [];
    this.pdfs = [];

    if (this.selectedChapter == null) {
      this.missingFilesArray = false;
      this.selectedTopic = null;
    }

    this.selectedTopic = null;

    console.log('selectedChapter', selectedChapter);
  }

  getTopicId(selectedTopic, event) {

    this.selectedTopic = selectedTopic;

    if (this.selectedTopic == null) {
      this.missingFilesArray = false;
      this.bulkSelect = true;
      this.bulkUploadButton = true;
      this.bulkSelect = true;
      this.fContents = [];
      this.videos = []
      this.ppts = [];
      this.pdfs = [];
    }
    else {
      this.bulkSelect = false;
      this.getContent();

    }

    //this.createContent();

  }


  getContent() {

    let boardId = this.selectedBoard.boardId;
    let classId = this.selectedClass.classId;

    if (this.selectedGroup != null) {
      var groupId = this.selectedGroup.groupId;
    }
    let subjectId = this.selectedSubject.subjectId;
    let chapterId = this.selectedChapter.chapterId;
    let topicId = this.selectedTopic.topicId;
    if (this.selectedClass.hasGroups == true && this.selectedClass.groups.length != 0) {
      this.api.content.get_with_groupId(boardId, classId, groupId, subjectId, chapterId, topicId).promise()
        .then(resp => {
          let etag = resp.headers.get('etag');

          console.log('------------->etag', etag);
          localStorage.setItem('etag', resp.headers.get('etag'));
          debugger;
          if (resp.body.Item != undefined) {
            this.fContents = resp.body.Item.contentDetails;
            this.setCategories(this.fContents);
          }

          else if (Object.keys(resp.body).length == 0) {
            console.log(this.fContents);
            this.fContents = [];
            console.log(this.ppts);
            this.videos = [];
            this.ppts = [];
            this.pdfs = [];

          }


        })
        .catch(e => {
          console.log(e);
        });
    } else {
      this.api.content.get_withOut_groupId(boardId, classId, subjectId, chapterId, topicId).promise()
        .then(resp => {
          let etag = resp.headers.get('etag');

          console.log('------------->etag', etag);
          localStorage.setItem('etag', resp.headers.get('etag'));

          if (resp.body.Item.contentDetails) {
            console.log('__________>cotents, resp.body.contents');
            this.fContents = resp.body.Item.contentDetails;
            this.setCategories(this.fContents);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }

  }

  setCategories(contents: FContent[]) {
    console.log('contents', contents);
    this.videos = contents.filter(content => content.contentResourceType === 'Video');
    this.ppts = contents.filter(content => content.contentResourceType === 'PPT');
    this.pdfs = contents.filter(content => content.contentResourceType === 'PDF');
    this.quizes = contents.filter(content => content.contentResourceType === 'Quiz');
    console.log('videos', this.videos);

  }

  selectedFile: any;

  onFileChanged(event, value) {

    this.selectedFileNew = event.target.files[0];
    this.viewBindingVar = {
      contentName: this.selectedFileNew.name
    }
    const key = this.viewBindingVar.contentName.toLowerCase();


    if (value == 'Video') {
      if (key.includes('mp4') || key.includes('mpg') || key.includes('avi') || key.includes('wmv') || key.includes('mov') || key.includes('flv')) {
        this.videos.push(this.viewBindingVar);
        this.selectedFile = event.target.files[0];

        this.uploadSucessVideo = false;
        // this.uploadSucessPdf = true;
        // this.uploadSucessPpt = true;


      }
      else {

        this.showMessage(false, 'File Type is Not video!');
      }
    }
    else if (value == 'PPT') {
      if (key.includes('ppt')) {
        this.ppts.push(this.viewBindingVar);
        this.selectedFile = event.target.files[0];
        this.uploadSucessPpt = false;
      }
      else {
        this.showMessage(false, 'File Type is Not ppt!');
      }
    }
    else if (value == 'PDF') {
      if (key.includes('pdf')) {
        this.pdfs.push(this.viewBindingVar);
        this.selectedFile = event.target.files[0];
        this.uploadSucessPdf = false;
      }
      else {
        this.showMessage(false, 'File Type is Not pdf!');
      }
    }

    // if (key.includes('mp4') || key.includes('mpg') || key.includes('avi') || key.includes('wmv') || key.includes('mov') || key.includes('flv')) {
    //   this.videos.push(this.viewBindingVar);
    // }
    // else if (key.includes('ppt')) {
    //   this.ppts.push(this.viewBindingVar);
    // }
    // else if (key.includes('pdf')) {
    //   this.pdfs.push(this.viewBindingVar);
    // }
  }
  certainType: string;
  onUpload(type: string) {
    this.spinner.show();
    if (type == 'Video') {

      this.uploadSucessVideo = false;
      // this.uploadSucessPdf = true;
      // this.uploadSucessPpt = true;
    }
    else if (type == 'PPT') {
      this.uploadSucessPpt = false;
    }
    else if (type == 'PDF') {
      this.uploadSucessPdf = false;
    }
    // upload code goes here
    console.log('_______>', type);



    this.certainType = type;
    let fileName = this.selectedFile.name;
    let total = fileName.split('.');
    let fileName2 = total[0];

    let extension = total[1];
    if (!this.validateType(extension)) {
      this.showMessage(false, 'File Type is invalid!');
      return null;
    }
    this.api.content.get_presigned_url(fileName).promise()
      .then(resp => {
        console.log("resp", resp);
        this.presigned = resp.body;
        console.log("presigned", this.presigned);
        localStorage.setItem('uploadType', this.presigned.contentType);
        this.uploadToS3(resp.body);

        //
        this.uploadSucessVideo = true;
        this.uploadSucessPdf = true;
        this.uploadSucessPpt = true;
        //
      })
      .catch(e => {
        this.spinner.hide();

        this.showMessage(false, 'Failed to get presigend Url from the server');
        console.log(e);
      });
  }
  deleteContent(pdf) {
    let ifmatch = localStorage.getItem('etag');
    let contentId = pdf.contentId;

    if (this.selectedGroup == null || this.selectedGroup == undefined) {
      var body = JSON.stringify(
        {
          "boardId": this.selectedBoard.boardId,
          "classId": this.selectedClass.classId,
          "subjectId": this.selectedSubject.subjectId,
          "chapterId": this.selectedChapter.chapterId,
          "topicId": this.selectedTopic.topicId,
          "contents": {
            filename: pdf.contentStorageKey
          }
        }
      );
    }
    else {
      var body = JSON.stringify(
        {
          "boardId": this.selectedBoard.boardId,
          "classId": this.selectedClass.classId,
          "subjectId": this.selectedSubject.subjectId,
          "chapterId": this.selectedChapter.chapterId,
          "topicId": this.selectedTopic.topicId,
          "groupId": this.selectedGroup.groupId,
          "contents": {
            filename: pdf.contentStorageKey
          }
        }
      );
    }

    let headers = new Headers({ 'Content-Type': 'application/json', 'If-Match': ifmatch });
    let options = new RequestOptions({
      headers: headers,
      body: body
    });

    return new Promise(resolve => {

      this.http.delete(`https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/content`, options)
        .subscribe(data => {
          this.getContent();
          console.log(data);
          resolve(data);
        })
    });


  }



  contentPopup(pdf) {
    // alert(JSON.stringify(pdf));
    this.showPopup = true;
    this.nameofFileOnPopUp = pdf.contentFileName
    this.contentTypeOnPopUP = pdf.contentFileType
    this.contentIdOnPopUP = pdf.contentId
    this.contentNameOnPopUP = pdf.contentName
    this.contentResourceOnPopUP = pdf.contentResourceType
    this.contentStorageBucketNameOnPopUP = pdf.contentStorageBucketName
    this.contentStorageKeyPopUP = pdf.contentStorageKey
  }

  validateType(extension: string) {

    const key = extension.toLowerCase();
    switch (this.certainType) {
      case 'Video':
        if (key.includes('mp4') || key.includes('mpg') || key.includes('avi') || key.includes('wmv') || key.includes('mov') || key.includes('flv')) {
          return true;
        } else {
          return false;
        }
      case 'PPT':
        if (key.includes('ppt')) {
          return true;
        }
        else {
          return false;
        }
      case 'PDF':
        if (key.includes('pdf')) {
          return true;
        }
        else {
          return false;
        }
      case 'Quiz':
        return true;
      default:
        return true;
    }
  }

  uploadToS3(presigned: Presigned) {

    this.httpp.put(presigned.presignedURL, this.selectedFile, { headers: new HttpHeaders({ 'Content-Type': presigned.contentType }) })
      .subscribe(success => {
        console.log('success', success);
        this.createContent();
      },
        error => {
          this.spinner.hide();
          this.showMessage(false, 'Failed to upload this data');
          console.log('error', error);
        }

      );
  }

  createContent() {
    let boardId = this.selectedBoard.boardId;
    let classId = this.selectedClass.classId;

    if (this.selectedGroup != null) {
      var groupId = this.selectedGroup.groupId;
    }
    let subjectId = this.selectedSubject.subjectId;
    let chapterId = this.selectedChapter.chapterId;
    let topicId = this.selectedTopic.topicId;
    let createdFContent = new FContent();
    createdFContent.contentId = UUID.UUID();
    createdFContent.contentStorageKey = this.presigned.contentStorageKey;
    createdFContent.contentResourceType = this.certainType;
    createdFContent.contentFileName = this.selectedFile.name;
    createdFContent.contentFileType = this.selectedFile.name.split('.').pop();
    createdFContent.contentName = this.selectedFile.name;
    createdFContent.contentStorageBucketName = this.presigned.contentStorageBucketName;
    console.log(createdFContent);
    if (this.fContents) {
      this.fContents.push(createdFContent);

    } else {
      this.fContents = [createdFContent];
    }

    if (this.selectedGroup != null) {
      this.api.content.put_content(boardId, classId, groupId, subjectId, chapterId, topicId, this.fContents).promise()
        .then(resp => {
          console.log('content ------->', resp);
          localStorage.setItem('etag', resp.headers.get('etag'));
          this.spinner.hide();
          this.showMessage(true, 'Successfully uploaded!');
          this.setCategories(this.fContents);
        }).catch(e => {
          console.log('content error ------->', e);
          this.spinner.hide();
          this.showMessage(false, 'Failed to save data info on the server');
        });
    }
    else {
      this.api.content.put_content_withoutGroup(boardId, classId, subjectId, chapterId, topicId, this.fContents).promise()
        .then(resp => {
          console.log('content ------->', resp);
          localStorage.setItem('etag', resp.headers.get('etag'));
          this.spinner.hide();
          this.showMessage(true, 'Successfully uploaded!');
          this.setCategories(this.fContents);
        }).catch(e => {
          console.log('content error ------->', e);
          this.spinner.hide();
          this.showMessage(false, 'Failed to save data info on the server');
        });
    }



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

  incomingfile(event) {
    this.selectedFileNew = event.target.files[0];
    this.viewBindingVar = {
      contentName: this.selectedFileNew.name
    }
    this.key = this.viewBindingVar.contentName.toLowerCase();

    if (this.key.includes('xlsx')) {
      this.selectedFile = event.target.files[0];
      this.bulkUploadButton = false;

    }
    else {
      this.showMessage(false, 'File Type is Not xlxs!');
    }
  }

  Upload() {
    this.spinner.show();

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let arrayBuffer: any = fileReader.result;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      this.jsonsheet = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
      // console.log(XLSX.utils.sheet_to_json(this.worksheet, { raw: false }));
      console.log(this.jsonsheet);
      for (let i = 0; i < this.jsonsheet.length; i++) {
        delete this.jsonsheet[i]['__rowNum__'];
        this.newJsonSheet.push(this.jsonsheet[i]);
      }
      console.log(this.newJsonSheet);

      this.bulkuPload();
      this.bulkUploadButton = true;
      this.spinner.hide();
    }
    fileReader.readAsArrayBuffer(this.selectedFileNew);
  }

  bulkuPload() {

    if (this.selectedGroup.groupId == undefined) {
      let postReq = {
        boardId: this.selectedBoard.boardId,
        classId: this.selectedClass.classId,
        subjectId: this.selectedSubject.subjectId,
        chapterId: this.selectedChapter.chapterId,
        topicId: this.selectedTopic.topicId,
        filelist: this.newJsonSheet
      }
      try {
        return new Promise(resolve => {
          this.httpp.post('https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/bulkuploads3', postReq, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .subscribe(data => {
              debugger
              this.bulkUploadFile = data;   
              console.log(this.bulkUploadFile);
              this.missingFilesArray = true;
            }, error => {
              if (error.status == 404) {
                this.key = "files are not there in the backend could not upload";
              }
            })
        });
      }
      catch{
        console.log("Error");
      }

    }
    else {
      let postReq: any = {
        boardId: this.selectedBoard.boardId,
        classId: this.selectedClass.classId,
        subjectId: this.selectedSubject.subjectId,
        chapterId: this.selectedChapter.chapterId,
        topicId: this.selectedTopic.topicId,
        groupId: this.selectedGroup.groupId,
        filelist: this.newJsonSheet
      }


      try {
        return new Promise(resolve => {
          this.httpp.post('https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/bulkuploads3', postReq, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .subscribe(data => {
              debugger
              this.bulkUploadFile = data;
              console.log(this.bulkUploadFile);
              this.missingFilesArray = true;
            }, error => {
              if (error.status == 404) {
                this.key = "files are not there in the backend could not upload";
              }
            })
        });
      }
      catch{
        console.log("Error");
      }
    }





  }

}

