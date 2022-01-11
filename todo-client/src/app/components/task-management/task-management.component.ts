import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit{

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
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
    
  }

  // onSubmit() {
  //  console.log('form data is ', this.profileForm.value);
  // }
}
