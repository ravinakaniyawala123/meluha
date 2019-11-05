import { Chapter } from "./chapter";

export class Subject {
  subjectName?: string;
  classId: string;
  groupId: string;
  subjectId: string;
  organizationId: string;
  chapters: Chapter[];
  selected: boolean;

  constructor() {
    this.chapters = [];
  }
}
