import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import {RoutesModule} from './routes/routes.module';
import { OrganizationComponent } from './components/organization/organization.component';
import { FeatureComponent } from './components/package/feature.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { BaseComponent } from './components/base/base.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {OrganizationCreateBoardComponent } from './components/organization/organization-create-board/organization-create-board.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {ApiService} from './api/api.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrganizationCreateClassComponent } from './components/organization/organization-create-class/organization-create-class.component';
import {UiSwitchModule} from 'ngx-ui-switch';
import {OrganizationCreateGroupComponent } from './components/organization/organization-create-group/organization-create-group.component';
import {CurriculumComponent } from './components/curriculum/curriculum.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {DropdownModule} from 'primeng/primeng';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {AccordionModule} from 'primeng/primeng';
import { OrganizationEditBoardComponent } from './components/organization/organization-edit-board/organization-edit-board.component';
import { OrganizationCreatSimpleClassComponent } from './components/organization/organization-creat-simple-class/organization-creat-simple-class.component';
import { OrganizationEditGroupComponent } from './components/organization/organization-edit-group/organization-edit-group.component';
import {GrowlModule} from 'primeng/growl';
import {TableModule} from "primeng/table";
import {FileUploadModule} from 'primeng/fileupload';
import { CreateChapterFromComponent } from './components/curriculum/create-chapter-from/create-chapter-from.component';
import { CreateTopicFormComponent } from './components/curriculum/create-topic-form/create-topic-form.component';
import { EditSubjectFormComponent } from './components/curriculum/edit-subject-form/edit-subject-form.component';
import { EditChapterFormComponent } from './components/curriculum/edit-chapter-form/edit-chapter-form.component';
import { EditTopicFormComponent } from './components/curriculum/edit-topic-form/edit-topic-form.component';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
// import {ProgressBarModule} from "angular-progress-bar";
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterPipe } from './filter.pipe';
import { Filter2Pipe } from './filter2.pipe';
import { Filter3Pipe } from './filter3.pipe';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DataServiceService } from './data-service.service';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    OrganizationComponent,
    FeatureComponent,
    NavBarComponent,
    LeftMenuComponent,
    BaseComponent,
    OrganizationCreateBoardComponent,
    OrganizationCreateClassComponent,
    OrganizationCreateGroupComponent,
    CurriculumComponent,
    OrganizationEditBoardComponent,
    OrganizationCreatSimpleClassComponent,
    OrganizationEditGroupComponent,
    CreateChapterFromComponent,
    CreateTopicFormComponent,
    EditSubjectFormComponent,
    EditChapterFormComponent,
    EditTopicFormComponent,
    FilterPipe,
    Filter2Pipe,
    Filter3Pipe,
    LoginComponent,
    SignupComponent

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutesModule,
    DialogModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    DropdownModule,
    TableModule,
    FileUploadModule,
    NgbDropdownModule,
    // ProgressBarModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,  
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    UiSwitchModule.forRoot({
      size: 'small',
      color: '#5CC25A',
      switchColor: '#ffffff',
      defaultBgColor: '#DF3B3A',
      defaultBoColor : '#DCDCDC',
    }),
    NgbModule.forRoot(),
    MDBBootstrapModule,
    GrowlModule,
    AccordionModule,
    HttpModule
  ],
  providers: [
    DataServiceService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
