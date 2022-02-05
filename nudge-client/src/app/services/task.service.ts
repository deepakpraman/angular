import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NudgeRequest } from '../models/nudge-request.model';
import { Task } from '../models/task.model';
const awsUrl = 'https://zftt6qr0b6.execute-api.eu-west-1.amazonaws.com/stg/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getMyTasks(workflow:String): Observable<Task[]> {
    // console.log(`${awsUrl}?workflow'=${workflow}`);    
   return this.http.get<Task[]>(`${awsUrl}?workflow=${workflow}`);   
 }

 getTasks(request:NudgeRequest): Observable<Task[]> {
   var json = JSON.stringify(request);
  //  console.log('hello in get tasks',json)
   return this.http.post<Task[]>(`${awsUrl}today`,json);   
}

 createTask(data: any): Observable<any> {
  //response : Observable;
  var json = JSON.stringify(data);
  // console.log('hello in submit',json,awsUrl)
  // this.http.post(awsUrl,
  //   json)
  // .subscribe(
  //     (val) => {
  //         console.log("POST call successful value returned in body", 
  //                     val);
  //     },
  //     response => {
  //         console.log("POST call in error", response);
  //     },
  //     () => {
  //         console.log("The POST observable is now completed.");
  //     });
 return this.http.post(awsUrl,json);
}

updateTask(data: any): String {
  var json = JSON.stringify(data);
  console.log(json);
  this.http.post<String>(`${awsUrl}edit-task`,json)  
   .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  return 'OOK';
}
}
