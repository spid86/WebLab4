import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditProjectComponentComponent } from "./edit-project-component/edit-project-component.component";
import { ProjectListComponentComponent } from "./project-list-component/project-list-component.component";
import { TaskListComponentComponent } from "./task-list-component/task-list-component.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProjectServiceService } from './project-service.service';
import { TaskServiceService } from './task-service.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [ProjectServiceService, TaskServiceService],
    imports: [CommonModule, HttpClientModule, RouterOutlet, EditProjectComponentComponent, ProjectListComponentComponent, TaskListComponentComponent,  ]
})
export class AppComponent {
  title = 'weblab4';
}
