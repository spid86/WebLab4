import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProjectListComponentComponent } from './project-list-component/project-list-component.component';
import { EditProjectComponentComponent } from './edit-project-component/edit-project-component.component';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [{ path: 'projects', component: ProjectListComponentComponent },
{ path: 'projects/new', component: EditProjectComponentComponent },
{ path: 'projects/:projectId', component: EditProjectComponentComponent },
{ path: 'tasks/:projectId', component: TaskListComponentComponent },
{ path: '' , redirectTo: 'projects', pathMatch: 'full'},
{ path: '**', component: PagenotfoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
