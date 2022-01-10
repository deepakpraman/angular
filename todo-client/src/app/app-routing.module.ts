import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWorkflowComponent } from './components/add-workflow/add-workflow.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { WorkflowDetailsComponent } from './components/workflow-details/workflow-details.component';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'workflows', component: WorkflowListComponent },
  { path: 'workflow/:id', component: WorkflowDetailsComponent },
  { path: 'taskDetails/:id', component: TaskDetailsComponent },
  { path: 'add', component: AddWorkflowComponent },
  { path: 'myTasks/:workflow', component: TaskDetailsComponent },
  { path: 'taskManagement', component: TaskManagementComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
