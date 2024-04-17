export interface Task {
    taskid: number;
    taskname: string;
    taskdescription: string;
    plannedenddate: Date;
    iscompleted: boolean;
    projectid: number;
  }