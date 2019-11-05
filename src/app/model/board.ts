import {ClassGroup} from './classgroup';

export class Board {
  boardId: string;
  boardCode: string;
  boardName: string;
  recordCreationTime: Date;
  recordUpdateTime: Date;
  classes: ClassGroup[];
}
