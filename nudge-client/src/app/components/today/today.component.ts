import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { NudgeRequest } from 'src/app/models/nudge-request.model';

import { EditTagDialogComponent } from '../edit-tag-dialog/edit-tag-dialog.component';import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {  
 
  workflow: String;
  tasks: Task[];
  space: string;
  task: Task;
  editId: any;
  request: NudgeRequest;
  dataSource!: MatTableDataSource<Task>;
  selected = 'Core-Java';
  currentDate : string;
  display=true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['space','workflow', 'task', 'step','level','edit'];


  constructor(private route: ActivatedRoute,private router: Router,
    private taskService:TaskService
     ,private tagDialog: MatDialog,private snackBar: MatSnackBar
    ) { }

  
    ngOnInit(): void {
      this.workflow = this.route.snapshot.params['workflow'];
      this.search();
      this.getToday();
      this.taskService.RefreshParameter.subscribe((val)=>{
        this.search();
      })
    }
  
    search(): void {
      this.request = new NudgeRequest;
      this.request.due='Feb';
      this.request.tag='today';
      this.taskService.getTasks(this.request)
        .subscribe({
          next: (data) => {
            this.tasks = data;
            this.dataSource = new MatTableDataSource(this.tasks);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },
          error: (e) => console.error(e)
        });       
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    // openDialog(tag:String,step_id:any) {    
    //   this.editId=step_id;
    //   const dialogRef = this.tagDialog.open(EditTagDialogComponent, {
    //     width: '400px',
    //     data:tag
    //   });
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     this.task = new Task;
    //     this.task.tags=result.data;
    //     this.task.step_id=this.editId;
    //     this.task.workflow=this.workflow;
    //     this.task.action='updateTag';
    //     this.workflowService.updateTask(this.task);
    //   });
    // }

    levelUp(space:any,workflow: any,stepId: any,klevel: any,taskValue: any,stepValue:any,due:any) {
      this.task = new Task;
      this.task.step_id=stepId;
      this.task.workflow=workflow;
      this.task.klevel=klevel;
      this.task.action='levelUp';
      this.taskService.updateTask(this.task);
      this.task.space=space;
      this.task.task=taskValue;
      this.task.step=stepValue;
      this.task.isActivity=true;
      this.task.due=due;
      this.taskService.createTask(this.task);
      this.showSnackbar("Level Up");  
      // this.reloadCurrentRoute();
    }

    // addToDay(workflow: any,stepId: any,tags: any) {
    //   this.task = new Task;
    //   this.task.workflow=workflow;
    //   this.task.step_id=stepId;
    //   this.task.tags=tags;
    //   this.task.action='addToDay';
    //   this.workflowService.updateTask(this.task);
    // }

    removeFromDay(workflow: any,stepId: any,tags: any,index: number) {
      this.task = new Task;
      this.task.workflow=workflow;
      this.task.step_id=stepId;
      this.task.tags=tags;
      this.task.action='removeToDay';
      this.taskService.updateTask(this.task);
      this.removeItem(index);
      this.showSnackbar("Task Removed From Today");
    }

    showSnackbar(action:any) {
      this.snackBar.open(action,'Close', {
        duration: 3000
      });
    }

    removeItem(index: number){
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); 
    }

    getToday() {
      var now = new Date();
      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);
      var today = (day) + "-" + (month) + "-" + now.getFullYear();    
      this.currentDate=today;
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

}
