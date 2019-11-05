import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from '../components/content/content.component';
import {OrganizationComponent} from '../components/organization/organization.component';
import {FeatureComponent} from '../components/package/feature.component';

const routes: Routes = [
  {path: 'content', component: ContentComponent, data: {title: 'content'}},
  {path: 'organization', component: OrganizationComponent, data: {title: 'organization'}},
  {path: 'package', component: FeatureComponent, data: {title: 'package'}}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
})
export class RoutesModule { }

