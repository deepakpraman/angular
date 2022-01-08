import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from 'src/app/models/steps.model';
import { Tasks } from 'src/app/models/tasks.model';
import { WorkflowsService } from 'src/app/services/workflows.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  
  id: String;
  taskSteps: Steps[];
  dataSource!: MatTableDataSource<Steps>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'workflow', 'task', 'step'];


  constructor(private route: ActivatedRoute,private router: Router,
    private workflowService:WorkflowsService) { }

  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.retrieveWorkflows();
    }
  
    retrieveWorkflows(): void {
      this.workflowService.getMyTasks()
        .subscribe({
          next: (data) => {
            this.taskSteps = data;
            this.dataSource = new MatTableDataSource(this.taskSteps);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log(this.id)
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
