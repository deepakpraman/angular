import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { EditTagDialogComponent } from '../edit-tag-dialog/edit-tag-dialog.component';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  workflow: String;
  tasks: Task[];
  task: Task;
  editId: any;
  dataSource!: MatTableDataSource<Task>;
  selected = 'Core-Java';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'workflow', 'task', 'step','tags','levelup','editTags'];


  constructor(private route: ActivatedRoute,private router: Router,
    private workflowService:TaskService
     ,private tagDialog: MatDialog
    ) { }

  
    ngOnInit(): void {
      this.workflow = this.route.snapshot.params['workflow'];
      this.retrieveWorkflows();
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

    search(workflow:string): void {
      this.selected=workflow;
      console.log('in component search {}',this.selected);
      this.workflowService.getMyTasks(this.selected)
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
  
}
