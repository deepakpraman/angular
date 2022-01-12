import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkflowsService } from 'src/app/services/workflows.service';
@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit{

  public profileForm: FormGroup;
  public login:any;

  constructor(private fb: FormBuilder, private workflowService:WorkflowsService) {}
  ngOnInit(): void {
   // console.log('after before init ', this.profileForm.value);
    this.profileForm = new FormGroup({
      workflow: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      task: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      step:new FormControl('', [Validators.required, Validators.maxLength(50)]),
      tags: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      });
  }

  public  onSubmit
    = (profileFormValue: any) => {
      console.log('form data is ', this.profileForm.value);
       this.workflowService.createTask(this.profileForm.value);
       console.log('after', this.profileForm.value);

  }

  // onSubmit() {
  //  console.log('form data is ', this.profileForm.value);
  // }
}
