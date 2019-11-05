import { Topic } from './topic';

export class Chapter {
  chapterName?: string;
  chapterId?: string;
  chapterNumber?: string;
  chapterDescription?: string;
  subjectId?: string;
  topics: Topic[];
  selected: boolean;
  colour: string;
  constructor() {
    this.topics = [];
  }
}
