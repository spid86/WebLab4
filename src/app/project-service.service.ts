import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './dto/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private baseUrl = 'http://localhost:8082/api/projects';

  constructor(private http: HttpClient) {}

  getProjects(searchTerm: string): Observable<Project[]> {
    const url = searchTerm ? `${this.baseUrl}?search=${searchTerm}` : `${this.baseUrl}?search=`;
    return this.http.get<Project[]>(url);
  }
  getProjectById(id: string | null): Observable<Project>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Project>(url);
  }
  createProject(project: Project): Observable<any>{
    const url = `${this.baseUrl}`;
    return this.http.post<Project>(url, project)
  }
  updateProject(id:string | null, project: Project): Observable<any>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Project>(url, project)
  }
  deleteProject(id: number): Observable<any>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  findIncomplete(): Observable<any>{
    return this.http.get<any>("http://localhost:8082/api/projects/incomplete")
  }
}
