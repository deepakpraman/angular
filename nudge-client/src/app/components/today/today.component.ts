import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { NudgeRequest } from 'src/app/models/nudge-request.model';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {  
  id: String;
  task: Task[];
  dataSource!: MatTableDataSource<Task>;
  selected = 'Core-Java';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  request:NudgeRequest;

  displayedColumns: string[] = ['id', 'workflow', 'task', 'step'];


  constructor(private route: ActivatedRoute,private router: Router,
    private workflowService:TaskService) { }

  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['workflow'];
      this.request = new NudgeRequest;
      this.request.workflow='Web';
      this.request.due='today';
      this.retrieveWorkflows();
    }
  
    retrieveWorkflows(): void {
      console.log('in component {}',this.id);
      this.workflowService.getTasks(this.request)
        .subscribe({
          next: (data) => {
            this.task = data;
            console.log('got today ',data);
            this.dataSource = new MatTableDataSource(this.task);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log(this.id)
          },
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
