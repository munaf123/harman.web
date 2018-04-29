import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { AdressComponent } from './adress/adress.component';
import { AdressService } from './shared/adress/adress.service';
import { NotesComponent } from './notes/notes.component';
import { TaskComponent } from './task/task.component';
import { VisitormanagementComponent } from './visitormanagement/visitormanagement.component';
import { AdressfilterPipe } from './shared/adressfilter.pipe';
import { NotesService } from './shared/notes/notes.service';
import { TasksService } from './shared/tasks/tasks.service';
import { VisitorService } from './shared/visitor/visitor.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component :HomeComponent},
  { path: 'adress', component :AdressComponent },
  { path: 'notes', component: NotesComponent},
  { path: 'tasks', component: TaskComponent},
  { path: 'visitor', component: VisitormanagementComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
  ];

@NgModule({
  declarations: [
    AppComponent,
    AdressComponent,
    NotesComponent,
    TaskComponent,
    VisitormanagementComponent,
    AdressfilterPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [AdressService, NotesService, TasksService, VisitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
