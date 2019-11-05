import { Component, OnInit } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import * as AWSCognito from 'amazon-cognito-identity-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  PoolData = { UserPoolId: 'ap-south-1_GzWudGsiI', ClientId: '8jfl9kj4iuom84d087h09eu0' };

  showContent = false;
  showPackage = false;
  showOrganization = true;
  showCurri = false;
  login = true;
  signUp = false;
  userPool: AWSCognito.CognitoUserPool;
  isLoggedIn: boolean;
  isNotLoggedIn: boolean;

  constructor() {
    this.userPool = new CognitoUserPool(this.PoolData);
  }

  ngOnInit() {

    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      this.isLoggedIn = true;
      this.isNotLoggedIn = false;
      this.showOrganization = true;
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log("NOSESSION");
          return;
        }
      });
    }
    else {
      this.login = true;
      this.isLoggedIn = false;
      this.isNotLoggedIn = true;
      this.showOrganization = false;
      console.log("SESSION");
    }

  }
 public ChangeView(clickedButton) {

    if (clickedButton === 'Organization') {
      this.showOrganization = true;
      this.showContent = false;
      this.showPackage = false;
      this.showCurri = false;
    } else if (clickedButton === 'Content') {
      this.showOrganization = false;
      this.showContent = true;
      this.showPackage = false;
      this.showCurri = false;
    } else if (clickedButton === 'Package') {
      this.showOrganization = false;
      this.showContent = false;
      this.showPackage = true;
      this.showCurri = false;
    } else if (clickedButton === 'Curriculum') {
      this.showOrganization = false;
      this.showContent = false;
      this.showPackage = false;
      this.showCurri = true;
    }
    else if (clickedButton === 'signUp') {
      this.signUp = true;
      this.login = false;
    }
    else if (clickedButton === 'login') {
      this.signUp = false;
      this.login = true;
    }
    else if (clickedButton === 'afterLogOut') {
      this.isLoggedIn = false;
      this.isNotLoggedIn = true;
    }
    else if (clickedButton === 'afterLogin') {
      this.showOrganization = true;
      this.isLoggedIn = true;
      this.isNotLoggedIn = false;
    }
    // else if (clickedButton === 'afterLogOut' && fromSignup =='fromSignup') {
    //   this.isLoggedIn = false;
    //   this.isNotLoggedIn = true;
    // }
  }
}
