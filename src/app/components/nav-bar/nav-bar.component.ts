import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import * as AWSCognito from 'amazon-cognito-identity-js';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  PoolData = { UserPoolId: 'ap-south-1_GzWudGsiI', ClientId: '8jfl9kj4iuom84d087h09eu0' };
  @Output() click = new EventEmitter<any>();
  @Input() AppComponent: AppComponent;
  userPool: AWSCognito.CognitoUserPool;
  constructor(private App: AppComponent) { 
    this.userPool = new CognitoUserPool(this.PoolData);
  }

  ngOnInit() {
  }

  
  logOut() { 
    
   
    const cognitoUser = this.userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.signOut();
      this.App.ChangeView('afterLogOut');
    }

 }


}
