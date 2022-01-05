import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Steps } from '../models/steps.model';
import { Tasks } from '../models/tasks.model';
import { Workflows } from '../models/workflows.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WorkflowsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Workflows[]> {
    return this.http.get<Workflows[]>(`${baseUrl}/workflows`);
  }

  get(id: any): Observable<Workflows> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getWorkflowTasks(id: any): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${baseUrl}/tasks`);
  }

  getTaskSteps(id: any): Observable<Steps[]> {
    return this.http.get<Steps[]>(`${baseUrl}/steps/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: any): Observable<Workflows[]> {
    return this.http.get<Workflows[]>(`${baseUrl}/workflows/byName?name=${name}`);
  }
}
