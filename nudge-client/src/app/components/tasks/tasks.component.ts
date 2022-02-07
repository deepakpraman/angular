import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { EditTagDialogComponent } from '../edit-tag-dialog/edit-tag-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectItem } from 'primeng/api/selectitem';
import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  workflow: String;
  tasks: Task[];
  tasks2: Task[];
  task: Task;
  editId: any;
  dataSource!: MatTableDataSource<Task>;
  selected = 'Core-Java';
  statuses: SelectItem[];
  clonedTasks: { [s: number]: Task; } = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //displayedColumns: string[] = ['id', 'workflow', 'task', 'step', 'tags', 'due', 'levelup', 'editTags'];


  constructor(private route: ActivatedRoute , private router: Router,
    private workflowService: TaskService, private tagDialog: MatDialog,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.workflow = this.route.snapshot.params['workflow'];
    this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]

  }


  search(workflow: string): void {
    this.selected = workflow;
    console.log('in component search {}', this.selected);
    this.workflowService.getMyTasks(this.selected)
      .subscribe({
        next: (data) => {
          this.tasks = data;
          this.tasks2 = data;
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

  openDialog(tag: String, step_id: any, workflow: any) {
    this.editId = step_id;
    this.workflow = step_id;
    const dialogRef = this.tagDialog.open(EditTagDialogComponent, {
      width: '400px',
      data: tag
    });

    dialogRef.afterClosed().subscribe(result => {
      this.task = new Task;
      this.task.tags = result.data;
      this.task.step_id = this.editId;
      this.task.workflow = this.workflow;
      this.task.action = 'updateTag';
      this.workflowService.updateTask(this.task);
    });
  }



  levelUp(stepId: any) {
    this.task = new Task;
    this.task.step_id = stepId;
    this.task.action = 'levelUp';
    this.workflowService.updateTask(this.task);
  }

  onRowEditInit(task: Task) {
    this.clonedTasks[task.step_id] = {...task};
}

onRowEditSave(task: Task) {
    if (task.klevel > 0) { 
        task.action='updateDue';
        this.workflowService.updateTask(task);
        delete this.clonedTasks[task.step_id];
        this.showSnackbar("Task is updated");    }  
    else {
      this.showSnackbar("Invalid Level");
    }
}

onRowEditCancel(task: Task, index: number) {
    this.tasks2[index] = this.clonedTasks[task.step_id];
    delete this.tasks2[task.step_id];
}

showSnackbar(action:any) {
  this.snackBar.open(action);
}

}
