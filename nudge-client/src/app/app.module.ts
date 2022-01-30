import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCommonModule, MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { TodayComponent } from './components/today/today.component';
import { ThisWeekComponent } from './components/this-week/this-week.component';
import { ThisMonthComponent } from './components/this-month/this-month.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { EditTagDialogComponent } from './components/edit-tag-dialog/edit-tag-dialog.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    ThisWeekComponent,
    ThisMonthComponent,
    TasksComponent,
    TaskManagementComponent,
    EditTagDialogComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSortModule,
    MatCommonModule,    
    MatInputModule,        
    MatOptionModule,
    MatButtonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,    
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
