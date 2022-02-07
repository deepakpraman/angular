import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityStreamsComponent } from './components/activity-streams/activity-streams.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ThisMonthComponent } from './components/this-month/this-month.component';
import { ThisWeekComponent } from './components/this-week/this-week.component';
import { TodayComponent } from './components/today/today.component';



const routes: Routes = [
  { path: 'app', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'today', component: TodayComponent },
  { path: 'week', component: ThisWeekComponent },
  { path: 'month', component: ThisMonthComponent },
  { path: 'add', component: TaskManagementComponent },
  { path: 'edit/:step_id', component: TaskManagementComponent },
  { path: 'workflow/:workflow', component: TasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
