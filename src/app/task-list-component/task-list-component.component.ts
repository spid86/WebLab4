import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../dto/Task';
import { TaskServiceService } from '../task-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list-component',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './task-list-component.component.html',
  styleUrl: './task-list-component.component.scss'
})
export class TaskListComponentComponent implements OnInit {
@Output() taskDeleted: EventEmitter<string> = new EventEmitter<string>();

tasks: Task[] = [];
projectId: string | null = ""; 
currentDate: Date = new Date();

constructor(private taskService: TaskServiceService,
  private route: ActivatedRoute,
) {}
deleteTask(index: number) {
  const taskToDelete = this.tasks[index];
  this.taskService.deleteTask(taskToDelete.taskid, taskToDelete.projectid).subscribe(sth => {
    this.tasks.splice(index, 1);
    this.taskDeleted.emit(taskToDelete.taskname);
  });
  
}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
      if (this.projectId !== null) {
        this.loadTasks(this.projectId);
      }
    });
    
  }
  loadTasks(projectId: string){
    this.taskService.getTasks(projectId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  isTaskExpired(enddate: Date): boolean{
    const currentDate: Date = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const taskEnd = new Date(enddate);
    taskEnd.setHours(0, 0, 0, 0);
    return taskEnd < currentDate;
  }
  
}
