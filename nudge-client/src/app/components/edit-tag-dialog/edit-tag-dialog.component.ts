import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'app-edit-tag-dialog',
  templateUrl: './edit-tag-dialog.component.html',
  styleUrls: ['./edit-tag-dialog.component.css']
})
export class EditTagDialogComponent implements OnInit {



  ngOnInit(): void {
  }
  
  id:String;
  local_data:String;
  action:String;

  constructor(
    public dialogRef: MatDialogRef<EditTagDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public width: String,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public tag: String) {
    this.local_data = tag;
    this.action='Update';
  }

  doAction(){
    this.dialogRef.close({event:this.id ,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
