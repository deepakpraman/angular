import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { ThisMonthComponent } from './components/this-month/this-month.component';
import { ThisWeekComponent } from './components/this-week/this-week.component';
import { TodayComponent } from './components/today/today.component';



const routes: Routes = [
  { path: 'app', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'today', component: TodayComponent },
  { path: 'week', component: ThisWeekComponent },
  { path: 'month', component: ThisMonthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
