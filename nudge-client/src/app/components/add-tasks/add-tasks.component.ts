import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  
  tasksTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: Task[];
  task: Task;
  spaces: any = ['FZ', 'Career', 'Health','Finance' ,'Chores']
  defaultSpace: string;
  constructor(private fb: FormBuilder
    , private taskService:TaskService
    ,private tagDialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.touchedRows = [];
    this.tasksTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }

  ngAfterOnInit() {
    this.control = this.tasksTable.get('tableRows') as FormArray;
    this.defaultSpace=this.spaces[2];
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      space: ['Career', Validators.required],
      workflow: ['', Validators.required],
      task: ['', [Validators.required]],
      step: ['', [Validators.required]],
      tags: [''],
      due: ['', [Validators.required, Validators.maxLength(10)]],
      dueDate: [''],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.tasksTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control =  this.tasksTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveTaskDetails() {

  }

  get getFormControls() {
    const control = this.tasksTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.tasksTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    this.touchedRows.forEach(task=>{
        this.addTasks(task);
    })
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  showSnackbar(action:any) {
    this.snackBar.open(action,'Close', {
      duration: 3000
    });
  }


   addTasks(newTask:Task) {
     this.task = new Task;
     this.task.space=newTask.space;
     this.task.workflow=newTask.workflow;
     this.task.task=newTask.task;
     this.task.step=newTask.step;
     this.task.due=newTask.due;
     this.task.tags=newTask.tags;
     this.taskService.createTask(this.task);
     this.showSnackbar("Task(s) Added");
   }


}
