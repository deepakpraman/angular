import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { NudgeRequest } from '../models/nudge-request.model';
import { Task } from '../models/task.model';
const awsUrl = 'https://zftt6qr0b6.execute-api.eu-west-1.amazonaws.com/stg/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _refreshParameter = new Subject<any>();

  constructor(private http: HttpClient) { }

  getMyTasks(workflow:String): Observable<Task[]> {
   return this.http.get<Task[]>(`${awsUrl}?workflow=${workflow}`);   
 }

 get RefreshParameter():Observable<any>{
   return this._refreshParameter;
 }

 getTasks(request:NudgeRequest): Observable<Task[]> {
   var json = JSON.stringify(request);
   console.log('getTasks->',json,awsUrl)
   var json = JSON.stringify(request);
   return this.http.post<Task[]>(`${awsUrl}today`,json);   
}

 createTask(data: any): Observable<any> {
  //response : Observable;
  var json = JSON.stringify(data);
  console.log('createTask->',json,awsUrl)
  this.http.post(`${awsUrl}save-task`,json)
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
 return this.http.post(`${awsUrl}save-task`,json);
}

updateTask(data: any): String {
  var json = JSON.stringify(data);
  console.log('updateTask->',json,awsUrl)
  this.http.post<String>(`${awsUrl}edit-task`,json) 
  .pipe(
    tap(val => {
      console.log("Completed Update");
    })
  )
 .subscribe(() => this._refreshParameter.next("Update Done"));
  ;
  // 
  
  //  .subscribe(
  //       (val) => {
  //           console.log("POST call successful value returned in body", 
  //                       val);
  //       },
  //       response => {
  //           console.log("POST call in error", response);
  //       },
  //       () => {
  //           console.log("The POST observable is now completed.");
  //       });
  return 'OOK';
}



}
