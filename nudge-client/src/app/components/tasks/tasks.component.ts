import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  id: String;
  task: Task[];
  dataSource!: MatTableDataSource<Task>;
  selected = 'Core-Java';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'workflow', 'task', 'step'];


  constructor(private route: ActivatedRoute,private router: Router,
    private workflowService:TaskService) { }

  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['workflow'];
      this.retrieveWorkflows();
    }
  
    retrieveWorkflows(): void {
      console.log('in component {}',this.id);
      this.workflowService.getMyTasks(this.id)
        .subscribe({
          next: (data) => {
            this.task = data;
            this.dataSource = new MatTableDataSource(this.task);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log(this.id)
          },
          error: (e) => console.error(e)
        });       
    }  

    search(): void {
      console.log('in component search {}',this.selected);
      this.workflowService.getMyTasks(this.selected)
        .subscribe({
          next: (data) => {
            this.task = data;
            this.dataSource = new MatTableDataSource(this.task);
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
  
}
