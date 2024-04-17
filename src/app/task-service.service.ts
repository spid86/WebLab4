import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './dto/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private baseUrl = 'http://localhost:8082/api/projects';
  
  constructor(private http: HttpClient) {}

  getTasks(id: string): Observable<Task[]> {
    const url = `${this.baseUrl}/${id}/tasks`;
    return this.http.get<Task[]>(url);
  }
  deleteTask(taskid: number, projectid: number): Observable<any>{
    const url = `${this.baseUrl}/${projectid}/tasks/${taskid}`;
    console.log(url)
    return this.http.delete<any>(url);
  }
}
