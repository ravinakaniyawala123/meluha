import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';

import * as AWSCognito from 'amazon-cognito-identity-js';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { DataServiceService } from 'src/app/data-service.service';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() click = new EventEmitter<any>();

  verifyNumber = true;
  showLoginForm = false;
  value: any;
  loginForm: FormGroup;
  loginData: any = [];
  logInValue: boolean;
  otp:any;

  resend = false;
  couunterVariabeForOtp: number = 0;
  PoolData = { UserPoolId: 'ap-south-1_GzWudGsiI', ClientId: '8jfl9kj4iuom84d087h09eu0' };

  userPool: AWSCognito.CognitoUserPool;
  nullCheckonotp = true;


  constructor(private formBuilder: FormBuilder,
    private App: AppComponent,
    public dataService: DataServiceService) {
    this.userPool = new CognitoUserPool(this.PoolData);

  }

  ngOnInit() {

    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log("NOSESSION");
          return;
        }
       // this.router.navigate(['/dashboard'], { replaceUrl: true });
      });
    }
    else {
    
      console.log("SESSION");
    }

    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  login(loginDetail) {
    this.signinUser();
  }


  signinUser() {

    this.loginForm.value.phoneNumber = "+91" + this.loginForm.value.phoneNumber.trim();
    var authData = {
      Username: this.loginForm.value.phoneNumber,
      Password: this.loginForm.value.password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: this.loginForm.value.phoneNumber,
      Pool: this.userPool
    };
   
    const cognitoUser = new CognitoUser(userData);
    console.log("cognito user" + JSON.stringify(cognitoUser));
    cognitoUser.authenticateUser(authDetails, {

      onSuccess: (result) => {
        console.log(result);
        this.click.emit('afterLogin');
      },
      onFailure: (err) => {
        if (err['code'] == "UserNotConfirmedException") {
          this.dataService.userNotConfirmed();
          this.showLoginForm = true;
          this.verifyNumber = false;
        }
        else if (err['code'] == "UserNotFoundException") {
          this.dataService.userNotFound();
          this.loginForm.reset();
        }
        else if (err['code'] == "NotAuthorizedException") {
          this.dataService.inCorrect();
          this.loginForm.reset();
        }
        else if (err['code'] == "NetworkError") {
          this.dataService.networkError();
          this.loginForm.reset();
        }

      }
    })
  }


  async forgotPassword() {

    const { value: email } = await swal({

      input: 'email',
      inputPlaceholder: 'Enter your email address'
    })

    if (email) {
      swal('Your new password sent to ' + email)
    }

  }



  signUp() {
    this.click.emit('signUp');
  }

  otpConfigration(otp) {
    
    this.dataService.otpMethod(otp, this.loginForm.value.phoneNumber).then((response) => {
      if (response.err) {
        if (response.err['code'] == "CodeMismatchException") {
          this.dataService.mismatchOTP();
        }
      }
      else if (response.success) {

        this.App.ChangeView('afterLogin');

      }
    });
  }

  onSearchChange(length) {
    if (length.length == 6) {
      this.nullCheckonotp = false;
    }
    else {
      this.nullCheckonotp = true;
    }

  }
  resendOtp() {

    if (this.couunterVariabeForOtp >= 3) {
      this.resend = true;
      this.dataService.exceedOtpLimit();
    }

    else {

      this.dataService.resendOtpMethod(this.loginForm.value.phoneNumber).then((response) => {
        if (response.success) {
          this.couunterVariabeForOtp++;
          this.dataService.sentOtp();
        }
        else if (response.error) {
          console.log('err result: ' + response.error);
        }
      })   
    }

  }
}
