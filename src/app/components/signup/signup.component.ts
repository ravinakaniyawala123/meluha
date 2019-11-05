import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataServiceService } from 'src/app/data-service.service';
import { PasswordValidation } from 'src/passwordValidation';
import { AppComponent } from 'src/app/app.component';
// import { PasswordValidation } from 'passwordValidation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  roles: string[] = [
    "Please select Role",
    "Super Admin",
    "Admin",
    "Academic Admin",
    "Content Admin",
    "Teachers Lead",
    "Teacher",
    "Academic Co-ordinator",
    "Analyst",
    "Finance",
    "student",
    "studentLead"
  ];
  default: string = 'Please select Role';

  @Output() click = new EventEmitter<any>();
  afterRegistration = true;
  registerForm = false;
  signUpForm: FormGroup;
  nullCheckonotp = true;
  otp: string;


  PoolData = { UserPoolId: 'ap-south-1_GzWudGsiI', ClientId: '8jfl9kj4iuom84d087h09eu0' };

  userPool: AWSCognito.CognitoUserPool;
  resend = false;
  couunterVariabeForOtp: number = 0;

  constructor(public router: Router,
    private formBuilder: FormBuilder,
    public dataService: DataServiceService,
    private App: AppComponent) {
    this.userPool = new CognitoUserPool(this.PoolData);
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      address: ['', [Validators.required, this.noWhitespaceValidator]],
      birthdate: [''],
      // locale: [''],
      picture: [''],
      //  Name: [''],
      role: [this.default],
      gender: [''],
      firstName: ['', [Validators.required, this.noWhitespaceValidator]],
      lastName: ['', [Validators.required, this.noWhitespaceValidator]],
      phoneNumber: ['', [Validators.required, this.noWhitespaceValidator]],
      email: ['', [Validators.required, this.noWhitespaceValidator]],
      password: [, [Validators.required, this.noWhitespaceValidator, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      cPassword: [, [Validators.required, this.noWhitespaceValidator, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
    }, { validator: PasswordValidation.MatchPassword });
  }
  noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  // converDate(value) {
  //   
  //   let today = value;
  //   var dd = today.getDate();
  //   var mm = today.getMonth() + 1;

  //   let yyyy = today.getFullYear();
  //   if (dd < 10) {

  //     dd = '0' + dd;
  //   }
  //   if (mm < 10) {
  //     mm = '0' + mm;
  //   }
  //   this.signUpForm.value.birthdate = dd + '/' + mm + '/' + yyyy;
  // }


  register() {
    if (this.signUpForm.value.password == this.signUpForm.value.cPassword) {
      this.signUpForm.value.firstName = this.signUpForm.value.firstName.trim();
      this.signUpForm.value.lastName = this.signUpForm.value.lastName.trim();
      this.signUpForm.value.phoneNumber = "+91" + this.signUpForm.value.phoneNumber.trim();
      this.signUpForm.value.email = this.signUpForm.value.email.trim();
      this.signUpForm.value.password = this.signUpForm.value.password.trim();
      this.signupUser(this.signUpForm.value.phoneNumber, this.signUpForm.value.password);
    }
    else {
      this.dataService.passwordNotMatch();
    }
  }

  signupUser(user, password) {
    console.log(this.signUpForm.value.birthdate);

    var attributeList = [];

    var address = {
      Name: 'address',
      Value: this.signUpForm.value.address
    };
    var birthdate = {
      Name: 'birthdate',
      Value: this.signUpForm.value.birthdate
    };

    var locale = {
      Name: 'locale',
      Value: 'hardcodedValue'
    };

    var picture = {
      Name: 'picture',
      Value: this.signUpForm.value.picture
    };

    var Name = {
      Name: 'name',
      Value: 'hardcodedvalue2'
    };

    var familyName = {
      Name: 'family_name',
      Value: this.signUpForm.value.firstName
    };
    var givenName = {
      Name: 'given_name',
      Value: this.signUpForm.value.lastName
    };

    var role = {
      Name: 'custom:role',
      Value: this.signUpForm.value.role
    };

    var gender = {
      Name: 'gender',
      Value: this.signUpForm.value.gender
    };

    var email = {
      Name: 'email',
      Value: this.signUpForm.value.email
    };

    var phoneNumber = {
      Name: 'phone_number',
      Value: this.signUpForm.value.phoneNumber
    };

    const addressAttr = new CognitoUserAttribute(address);
    const birthdateAttr = new CognitoUserAttribute(birthdate);
    const localeAttr = new CognitoUserAttribute(locale)
    const pictureAttr = new CognitoUserAttribute(picture)
    const NameAttr = new CognitoUserAttribute(Name)
    const familyNameAttr = new CognitoUserAttribute(familyName);
    const givenNameAttr = new CognitoUserAttribute(givenName);
    const roleAttr = new CognitoUserAttribute(role)
    const genderAttr = new CognitoUserAttribute(gender);
    const emailAttr = new CognitoUserAttribute(email);
    const phoneNumberAttr = new CognitoUserAttribute(phoneNumber);

    attributeList.push(addressAttr);
    attributeList.push(birthdateAttr);
    attributeList.push(localeAttr);
    attributeList.push(pictureAttr);
    attributeList.push(NameAttr);
    attributeList.push(familyNameAttr);
    attributeList.push(givenNameAttr);
    attributeList.push(roleAttr);
    attributeList.push(genderAttr);
    attributeList.push(emailAttr);
    attributeList.push(phoneNumberAttr);

    this.userPool.signUp(user, password, attributeList, attributeList, ((err, result) => {

      if (err) {
        if (err['code'] == "UsernameExistsException") {
          this.dataService.userAlreadyExist();
          this.signUpForm.reset();
        }
      }

      else if (result) {
        this.registerForm = true;
        this.afterRegistration = false;
        this.dataService.successfulSignup();
      }
    }))
  }



  otpConfigration(otp) {

    this.dataService.otpMethod(otp, this.signUpForm.value.phoneNumber).then((response) => {
      if (response.err) {
        if (response.err['code'] == "CodeMismatchException") {
          this.dataService.mismatchOTP();
        }
      }
      else if (response.success) {
        // this.App.ChangeView('afterLogOut','fromSignup');
        this.click.emit('login');
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

      this.dataService.resendOtpMethod(this.signUpForm.value.phoneNumber).then((response) => {
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

  login() {
    this.click.emit('login');
  }

}
