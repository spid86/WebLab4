import { Component, OnInit } from '@angular/core';
import { Project } from '../dto/Project';
import { ProjectServiceService } from '../project-service.service'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { EditProjectComponentComponent } from '../edit-project-component/edit-project-component.component';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, EditProjectComponentComponent, RouterLink],
  templateUrl: './project-list-component.component.html',
  styleUrl: './project-list-component.component.scss'
})
export class ProjectListComponentComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];


  constructor(private projectService: ProjectServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects("");
    
  }
  loadProjects(searchTerm: string) {
    forkJoin([
      this.projectService.getProjects(searchTerm),
      this.projectService.findIncomplete()
    ]).subscribe(([projects, openTaskCounts]) => {
      const openTaskCountMap: Record<string, number> = {};
      openTaskCounts.forEach((p: any) => {
        openTaskCountMap[p.projectId] = p.openTaskCount;
      });

      this.projects = projects.map((project => {
        const openTaskCount = openTaskCountMap[project.projectid] || 0;
        project.openTaskCount = openTaskCount;

        return {...project, openTaskCount};
      }));
      
      this.filteredProjects = [...this.projects];

    });
  }
  
  searchProjects(searchTerm: string) {
    this.loadProjects(searchTerm);
    
  }
  createNewProject() {
    this.router.navigate(['projects/new']);
  }
  editProject(project: Project){
    this.router.navigate([`projects/${project.projectid}`]);
  }
  viewTasks(project: Project){
    this.router.navigate([`tasks/${project.projectid}`])
  }
  deleteProject(project: Project){
    this.projectService.deleteProject(project.projectid).subscribe(ss => {
      this.projects = this.projects.filter(obj => {return obj.projectid !== project.projectid});
      this.filteredProjects = this.filteredProjects.filter(obj => {return obj !== project});
    });
  }

  
}