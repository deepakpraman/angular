import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from 'src/app/models/steps.model';
import { Tasks } from 'src/app/models/tasks.model';
import { WorkflowsService } from 'src/app/services/workflows.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  
  id?: String;
  taskSteps?: Steps[];

  constructor(private route: ActivatedRoute,private router: Router,
    private workflowService:WorkflowsService) { }

  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      console.log('initID'+this.id);
      this.retrieveWorkflows();
    }
  
    retrieveWorkflows(): void {
      console.log('taskId'+this.id);
        this.workflowService.getTaskSteps(this.id)
        .subscribe({
          next: (data) => {
            this.taskSteps = data;
            console.log(this.id)
          },
          error: (e) => console.error(e)
        });
    }

}
