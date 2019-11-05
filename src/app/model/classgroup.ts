import {Group} from './group';

export class ClassGroup {

  hasGroups?: boolean;
  recordCreationTime?: Date;
  className?: string;
  classId?: string;
  isActivity?: boolean;
  recordUpdateTime: Date;
  groups?: Group[];
}
