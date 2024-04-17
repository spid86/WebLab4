import { Task } from "./Task";
export interface Project {
    projectid: number;
    projectname: string;
    projectdescription: string;
    startdate: Date;
    enddate: Date;
    openTaskCount: number;
    tasks: Task[];
  }