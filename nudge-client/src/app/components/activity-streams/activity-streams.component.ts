import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
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
  selector: 'app-activity-streams',
  templateUrl: './activity-streams.component.html',
  styleUrls: ['./activity-streams.component.css']
})
export class ActivityStreamsComponent implements OnInit {

  
  workflow: String;
  tasks: Task[];
  task: Task;
  editId: any;
  request: NudgeRequest;
  dataSource!: MatTableDataSource<Task>;
  selected = 'Core-Java';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['datetime','workflow','task', 'step'];


  constructor(private route: ActivatedRoute,private router: Router,
    private taskService:TaskService
     ,private tagDialog: MatDialog,private snackBar: MatSnackBar
    ) { }

  
    ngOnInit(): void {
      this.search();
      this.taskService.RefreshParameter.subscribe((val)=>{
        this.search();
      })
    }
  
    search(): void {
      this.request = new NudgeRequest;
      this.request.due='Feb';
      this.request.isActivity=true;
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

}
