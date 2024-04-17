import { Component, OnInit } from '@angular/core';
import { Project } from '../dto/Project';
import { ProjectServiceService } from '../project-service.service'; 
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-project-component',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './edit-project-component.component.html',
  styleUrl: './edit-project-component.component.scss'
})
export class EditProjectComponentComponent{
  projectId: string | null = ""; 
  project: any = {}; 
  isNewProject: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectServiceService) {}


    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.projectId = params.get('projectId');
        this.isNewProject = this.projectId === null; 
        console.log(this.projectId);
        if (this.projectId !== null) {
          this.loadProject(this.projectId);
        }
      });
    }
    loadProject(id: string | null): void {
      this.projectService.getProjectById(id).subscribe(project => {
        this.project = project;
      });
    }
    onSubmit(formData: any): void {
      if (this.projectId === null) {
        // Create new project
        this.projectService.createProject(formData).subscribe(() => {
          this.router.navigate(['/projects']); 
        });
      } else {
        // Update existing project
        this.projectService.updateProject(this.projectId, formData).subscribe(() => {
          this.router.navigate(['/projects']); 
        });
      }
    }
}