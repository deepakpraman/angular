import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Steps } from '../models/steps.model';
import { Tasks } from '../models/tasks.model';
import { Workflows } from '../models/workflows.model';

const baseUrl = 'http://localhost:8080';
const awsUrl = 'https://zftt6qr0b6.execute-api.eu-west-1.amazonaws.com/stg/';

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

  getMyTasks(workflow:String): Observable<Steps[]> {
     console.log(`${awsUrl}?workflow'=${workflow}`);    
    return this.http.get<Steps[]>(`${awsUrl}?workflow=${workflow}`);
    
  }
}
