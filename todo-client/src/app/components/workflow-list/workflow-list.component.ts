import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workflows } from 'src/app/models/workflows.model';
import { WorkflowsService } from 'src/app/services/workflows.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit {

  workflows?: Workflows[];
  currentWorkflows: Workflows = {};
  name = '';
  workflowDate: any;


  constructor(private Workflowservice: WorkflowsService,private router: Router) { 
    this.workflowDate  = new Date();
  }

  ngOnInit(): void {
    this.retrieveWorkflows();
  }

  retrieveWorkflows(): void {
    this.Workflowservice.getAll()
      .subscribe({
        next: (data) => {
          this.workflows = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  searchByName(): void {
    this.currentWorkflows = {};
    console.log(this.workflowDate);

    this.Workflowservice.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.workflows = data;
        },
        error: (e) => console.error(e)
      });
  }

  workflowDetails(workflowId: number){
    this.router.navigate(['workflow', workflowId]);
  }

}
