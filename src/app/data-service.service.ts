import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
//import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { resolve, reject } from 'q';
import { asQueryList } from '@angular/core/src/view';

@Injectable()
export class DataServiceService {
  PoolData = { UserPoolId: 'ap-south-1_GzWudGsiI', ClientId: '8jfl9kj4iuom84d087h09eu0' };
  ngRox = "http://localhost:3000";
  userPool: AWSCognito.CognitoUserPool;

  val: any;
  data: any;
  loginCredentials: any;
  chapterId: any;
  videoUrl: any;

  constructor(private http: HttpClient) {
    this.userPool = new CognitoUserPool(this.PoolData);
  }
  sessionCheck(): Promise<any> {
    
    const cognitoUser = this.userPool.getCurrentUser();
    let session = new Promise((resolve, reject) => {
      if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
          if (err) {
            alert(err);

            resolve(false);
            return;
          }
          resolve(true);
          console.log('session validity: ' + session.isValid());
        });
      }
      else {
        resolve(false);
      }

    })
    return session;
  }

  //////////////////////getter setter/////////////
  setChapterId(chapterId) {

    return this.chapterId = chapterId;
  }
  getChapterId() {
    return this.chapterId;
  }
  // setLoginData(data: any) {
  //   
  //   return this.data = data;
  // }

  // getLoginData() {
  //   return this.data;
  // }

  setUserCredentails(loginCredentials) {
    
    this.loginCredentials = loginCredentials.idToken.payload;
  }

  getUserCredentails() {
    return this.loginCredentials;
  }

  setCartData(data: any) {
    
    return this.data = data;
  }

  getCartData() {
    return this.data;
  }

  createPackage(idToken) {

    let him = {

      contentInclusions: {
        boards: ["board new"],
        chapters: ["chapter 2"],
        classes: ["board class"],
        groups: ["group1"],
        subjects: ["MATHS", "ENGLISH", "M"]
      },
      otherInclusions: ["Discussion Boards 1", "Discussion Boards 2"],
      packageCode: 74,
      packageId: "146322ff-e269-e399-a1b2-fa9c89a73764",
      packagedName: "himanshu",
      packagePicture: ["https://i.pinimg.com/236x/e3/05/d8/e305d8f4ff930cb9085380664a4c562b--science-books-book-covers.jpg"],
      basePackagePrice: "200",
      basePrice_discussion: "400",
      basePrice_discussion_tutor: "600"

    }
    console.log(him);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': idToken.jwtToken,
        'Content-Type': 'application/json',
      })
    };
    console.log(httpOptions);
    return new Promise(resolve => {

      this.http.post(this.ngRox + "/v1/data/user", him, httpOptions)
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });

  }


  userLogin(idToken) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': idToken.jwtToken,
        'Content-Type': 'application/json',
      })
    };
    console.log(httpOptions);
    return new Promise(resolve => {

      this.http.get(this.ngRox + "/v1/data/user", httpOptions)
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }

  saveNotes(notesDetail, idToken) {


    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': idToken.jwtToken,
        'Content-Type': 'application/json',
      })
    };

    return new Promise(resolve => {

      this.http.post(this.ngRox + "/v1/data/user/content", notesDetail, httpOptions)
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }

  userData(idToken) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': idToken.jwtToken,
        'Content-Type': 'application/json',
      })
    };
    console.log(httpOptions);
    return new Promise(resolve => {

      this.http.get(this.ngRox + "/v1/data/user/data", httpOptions)
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }


  s3BucketUrl(storageKey) {
    let url = {
      preUrl: storageKey
    }
    
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': idToken.jwtToken,
    //     'Content-Type': 'application/json',
    //   })
    // };
    // console.log(httpOptions);
    return new Promise(resolve => {

      this.http.post(this.ngRox + "/v1/data/se3Fetch", url)
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }

  setS3Videourl(url) {
    this.videoUrl = url;
  }
  getS3videourl() {
    return this.videoUrl;
  }


  updateUser(idToken, profile) {

    // let him = {

    //   contentInclusions: {
    //     boards: ["board new"],
    //     chapters: ["chapter 2"],
    //     classes: ["board class"],
    //     groups: ["group1"],
    //     subjects: ["MATHS", "ENGLISH", "M"]
    //   },
    //   otherInclusions: ["Discussion Boards 1", "Discussion Boards 2"],
    //   packageCode: 74,
    //   packageId: "146322ff-e269-e399-a1b2-fa9c89a73764",
    //   packagedName: "himanshu",
    //   packagePicture: ["https://i.pinimg.com/236x/e3/05/d8/e305d8f4ff930cb9085380664a4c562b--science-books-book-covers.jpg"],
    //   basePackagePrice: "200",
    //   basePrice_discussion: "400",
    //   basePrice_discussion_tutor: "600"

    // }
    // console.log(him);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': idToken.jwtToken,
        'Content-Type': 'application/json',
      })
    };
    console.log(httpOptions);
    return new Promise(resolve => {

      this.http.post(this.ngRox + "/v1/data/user/profile", profile, httpOptions)
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }
  /////////////////////GET DATA HITS/////////////////////////



  // sessionCheck() {
  //   return new Promise(resolve => {
  //     this.http.get(adminPannel + "session").map(res => res)
  //       .subscribe(res => {
  //         this.val = res;
  //         resolve(this.val);
  //       })
  //   })
  // }

  logout() {
    // return new Promise(resolve => {
    //   this.http.get(adminPannel + "logout").map(res => res)
    //     .subscribe(res => {
    //       this.val = res;
    //       resolve(this.val);
    //     })
    // })
  }



  /////////////////////POST DATA HITS/////////////////////////
  getBoards() {
    return new Promise(resolve => {
      this.http.get('https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/organization', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }

  getPacakge() {
    return new Promise(resolve => {

      this.http.get('https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/package', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .subscribe(data => {
          // this.pacakageData = data;
          // console.log(this.pacakageData);
          resolve(data);
        })
    });
  }

  getSubjects_withGroupId(idsObject) {
    return new Promise(resolve => {

      this.http.get(`https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/board/${idsObject.boardId}/class/${idsObject.classId}/group/${idsObject.groupId}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }

  getSubjects_withoutGroupId(idsObject) {
    return new Promise(resolve => {

      this.http.get(`https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/board/${idsObject.boardId}/class/${idsObject.classId}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }
  get_content_with_groupId(boardId, classId, groupId, subjectId, chapterId, topicId) {
    return new Promise(resolve => {

      this.http.get(`https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/board/${boardId}/class/${classId}/group/${groupId}/subject/${subjectId}/chapter/${chapterId}/topic/${topicId}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }
  get_content_withOut_groupId(boardId, classId, subjectId, chapterId, topicId) {
    return new Promise(resolve => {

      this.http.get(`https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev/v1/data/board/${boardId}/class/${classId}/subject/${subjectId}/chapter/${chapterId}/topic/${topicId}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }


  partnerlogin(partnerlogin) {
    // return new Promise(resolve => {
    //   this.http.post(adminPannel + "partnerlogin", partnerlogin).map(res => res)
    //     .subscribe(res => {
    //       this.val = res;
    //       resolve(this.val);
    //     })
    // })
  }

  //  addPackage(partnerlogin) {
  //     
  //     return new Promise(resolve => {
  //       this.http.post("http://264e22d7.ngrok.io/v1/data/user" , partnerlogin).map(res => res)
  //         .subscribe(res => {
  //           this.val = res;
  //           resolve(this.val);
  //         })
  //     })
  //   }


  addPackage(idToken) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': idToken.jwtToken,
        'Content-Type': 'application/json',
      })
    };
    console.log(httpOptions);
    return new Promise(resolve => {

      this.http.get(this.ngRox + "/v1/data/user", httpOptions)
        .subscribe(resp => {
          resolve(resp);
        })
    })
      .catch(e => {
        console.log(Error + e);
      });
  }


  


  ////////////////////AWS//////////////////////


  otpMethod(otp, phoneNumber): Promise<any> {

    let otpPromise = new Promise((resolve, reject) => {

      var userData = {
        Username: phoneNumber,
        Pool: this.userPool
      };

      var cognitoUser = new CognitoUser(userData);
      // cognitoUser.resendConfirmationCode(((err, result) => {
      cognitoUser.confirmRegistration(otp, true, (err, result) => {
        
        if (result) {
          let success = {
            success: result
          }
          resolve(success);
        }

        else if (err) {
          if (err.code == "CodeMismatchException") {
            let error = {
              err: err
            }
            resolve(error);
          }
        }

      });
    })
    return otpPromise;

  }

  resendOtpMethod(phoneNumber): Promise<any> {

    let resendOtp = new Promise((resolve, reject) => {

      var userData = {
        Username: phoneNumber,
        Pool: this.userPool
      };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.resendConfirmationCode(((err, result) => {
        if (result) {
          let success = {
            success: result
          }
          resolve(success);

        }
        else {
          let error = {
            err: err
          }
          resolve(error);
          console.log('err result: ' + err);
        }
      }));
    })
    return resendOtp;
  }




  /////////////////////ALERT MESSAGES////////////////////

  passwordNotMatch() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: 'Your password doesnot match'
    })
  }

  userAlreadyExist() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'success',
      title: 'Already exists..Please login'
    })
  }

  successfulSignup() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'success',
      title: 'You have successfully signed up, please confirm your otp'
    })
  }

  mismatchOTP() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: 'Incorrect OTP'
    })
  }

  matchOTP() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: 'Incorrect OTP'
    })
  }

  exceedOtpLimit() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: 'You have reached the limit of sending OTP. Please try after some time.'
    })
  }

  sentOtp() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'success',
      title: 'OTP successfully resend'
    })
  }

  userNotConfirmed() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: 'User is not confirmed.'
    })
  }

  userNotFound() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: 'User is not Exist. Please signup first.'
    })
  }
  inCorrect() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: 'Incorrect username or password.'
    })
  }
  networkError() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: 'Please Check Your Internet Connection.'
    })
  }
  guestLogin() {
    const toast = swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2000
    });
    toast({
      type: 'error',
      title: 'Please Login'
    })
  }

  /////////////////////ALERT MESSAGES////////////////////

}








