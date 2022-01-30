import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { NudgeRequest } from 'src/app/models/nudge-request.model';

import { EditTagDialogComponent } from '../edit-tag-dialog/edit-tag-dialog.component';import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {  
 
  workflow: String;
  tasks: Task[];
  task: Task;
  editId: any;
  request: NudgeRequest;
  dataSource!: MatTableDataSource<Task>;
  selected = 'Core-Java';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'workflow', 'task', 'step','level','levelup','editTags','removeToDay'];


  constructor(private route: ActivatedRoute,private router: Router,
    private workflowService:TaskService
     ,private tagDialog: MatDialog
    ) { }

  
    ngOnInit(): void {
      this.workflow = this.route.snapshot.params['workflow'];
      this.search();
    }
  
    retrieveWorkflows(): void {
      console.log('in component {}',this.workflow);
      this.workflowService.getMyTasks(this.workflow)
        .subscribe({
          next: (data) => {
            this.tasks = data;
            this.dataSource = new MatTableDataSource(this.tasks);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log(this.workflow)
          },
          error: (e) => console.error(e)
        });       
    }  

    search(): void {
      this.request = new NudgeRequest;
      this.request.due='Feb';
      this.request.tag='today';
      this.workflowService.getTasks(this.request)
        .subscribe({
          next: (data) => {
            this.tasks = data;
            this.dataSource = new MatTableDataSource(this.tasks);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log(this.selected)
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

    openDialog(tag:String,step_id:any) {    
      this.editId=step_id;
      const dialogRef = this.tagDialog.open(EditTagDialogComponent, {
        width: '400px',
        data:tag
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.task = new Task;
        this.task.tags=result.data;
        this.task.step_id=this.editId;
        this.task.workflow=this.workflow;
        this.task.action='updateTag';
        this.workflowService.updateTask(this.task);
      });
    }

    levelUp(stepId: any) {
      this.task = new Task;
      this.task.step_id=stepId;
      this.task.action='levelUp';
      this.workflowService.updateTask(this.task);
    }

    addToDay(workflow: any,stepId: any,tags: any) {
      this.task = new Task;
      this.task.workflow=workflow;
      this.task.step_id=stepId;
      this.task.tags=tags;
      this.task.action='addToDay';
      this.workflowService.updateTask(this.task);
    }

    removeFromDay(workflow: any,stepId: any,tags: any) {
      this.task = new Task;
      this.task.workflow=workflow;
      this.task.step_id=stepId;
      this.task.tags=tags;
      this.task.action='removeToDay';
      this.workflowService.updateTask(this.task);
    }

}
