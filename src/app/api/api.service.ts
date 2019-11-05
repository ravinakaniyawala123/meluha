import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private request: ApiRequestService) { }

  organization = {

    gets: () => this.request
      .get()
      .url('/v1/data/organization'),
    get: (organizationId, boardId) => this.request
      .get()
      .url('/api/v1/data/{}/board/{}', organizationId, boardId),
    post: (organizationId, board) => this.request
      .post({ boardName: board.boardName, boardCode: board.boardCode })
      .url('/api/v1/data/{}/board', organizationId),
    put: (board) => this.request
      .put({ boards: board })
      .url('/v1/data/organization/'),
    delete: (organizationId, boardId) => this.request
      .delete()
      .url('/api/v1/data/{}/board/{}', organizationId, boardId)
  };

  subject = {
    get_with_groupId: (boardId, classId, groupId) => this.request
      .get()
      .url('/v1/data/board/{}/class/{}/group/{}', boardId, classId, groupId),
    get_withOut_groupId: (boardId, classId) => this.request
      .get()
      .url('/v1/data/board/{}/class/{}', boardId, classId),
    post_with_groupId: (boardId, classId, groupId, subjects) => this.request
      .post({ boardId: boardId, classId: classId, groupId: groupId, subjects: subjects })
      .url('/v1/data/subject'),
    post_withOut_groupId: (boardId, classId, subjects) => this.request
      .post({ boardId: boardId, classId: classId, subjects: subjects })
      .url('/v1/data/subject'),
    put: (boardId, classId, groupId, subjects) => this.request
      .put({ boardId: boardId, classId: classId, groupId: groupId, subjects: subjects })
      .url('/v1/data/subject'),
  };
  chapter = {
    put_with_groupId: (boardId, classId, groupId, subjectId, data) => this.request
      .put({ boardId: boardId, classId: classId, groupId: groupId, subjectId: subjectId, chapters: data })
      .url('/v1/data/chapter'),
    put_withOut_groupId: (boardId, classId, subjectId, data) => this.request
      .put({ boardId: boardId, classId: classId, subjectId: subjectId, chapters: data })
      .url('/v1/data/chapter')
  };
  topic = {
    put_with_groupId: (boardId, classId, groupId, subjectId, chapterId, data) => this.request
      .put({ boardId: boardId, classId: classId, groupId: groupId, subjectId: subjectId, chapterId: chapterId, topics: data })
      .url('/v1/data/topic'),
    put_withOut_groupId: (boardId, classId, subjectId, chapterId, data) => this.request
      .put({ boardId: boardId, classId: classId, subjectId: subjectId, chapterId: chapterId, topics: data })
      .url('/v1/data/topic')
  };

  content = {

    get_with_groupId: (boardId, classId, groupId, subjectId, chapterId, topicId) => this.request
      .get()
      .url('/v1/data/board/{}/class/{}/group/{}/subject/{}/chapter/{}/topic/{}', boardId, classId, groupId, subjectId, chapterId, topicId),
    get_withOut_groupId: (boardId, classId, subjectId, chapterId, topicId) => this.request
      .get()
      .url('/v1/data/board/{}/class/{}/subject/{}/chapter/{}/topic/{}', boardId, classId, subjectId, chapterId, topicId),
    get_presigned_url: (filename) => this.request
      .get()
      .url('/v1/data/contenturl?filename={}', filename),
    put_content: (boardId, classId, groupId, subjectId, chapterId, topicId, fContents) => this.request
      .put({ boardId: boardId, classId: classId, groupId: groupId, subjectId: subjectId, chapterId: chapterId, topicId: topicId, contents: fContents })
      .url('/v1/data/content'),
    upload_s3: (url, contenttype, file) => this.request
      .upload(file, contenttype)
      .url(url),
    put_content_withoutGroup: (boardId, classId, subjectId, chapterId, topicId, fContents) => this.request
      .put({ boardId: boardId, classId: classId, subjectId: subjectId, chapterId: chapterId, topicId: topicId, contents: fContents })
      .url('/v1/data/content'),
      // delete: (organizationId, boardId) => this.request
      // .delete()
      // .url('/api/v1/data/{}/board/{}', organizationId, boardId)

  }
}
