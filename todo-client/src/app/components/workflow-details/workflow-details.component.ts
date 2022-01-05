import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from 'src/app/models/steps.model';
import { Tasks } from 'src/app/models/tasks.model';
import { Workflows } from 'src/app/models/workflows.model';
import { WorkflowsService } from 'src/app/services/workflows.service';

@Component({
  selector: 'app-workflow-details',
  templateUrl: './workflow-details.component.html',
  styleUrls: ['./workflow-details.component.css']
})
export class WorkflowDetailsComponent implements OnInit {

  id?: String;
  workflowTasks?: Tasks[];
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
      this.workflowService.getWorkflowTasks(1)
        .subscribe({
          next: (data) => {
            this.workflowTasks = data;
          //  console.log(data);
          },
          error: (e) => console.error(e)
        });

        this.workflowService.getTaskSteps(this.id)
        .subscribe({
          next: (data) => {
            this.taskSteps = data;
            console.log(this.id)
          },
          error: (e) => console.error(e)
        });
    }

    taskDetails(taskId?: String){
      this.router.navigate(['taskDetails', taskId]);
      console.log('routedId'+this.id);
    }
  

}
