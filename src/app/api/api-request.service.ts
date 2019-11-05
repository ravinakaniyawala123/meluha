import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import assign from 'lodash.assign';
import { ApiRequest } from './api-request';
// import { MeService } from '../services/me.service';
@Injectable({
  providedIn: 'root'
})


export class ApiRequestService {

  constructor(private http: HttpClient) {
  
  }
  
  
  observableFact(apiRequest: ApiRequest): Observable<any> {
    const options: any = { params: {}, 'observe': 'response' };
    // if (apiRequest.requestAuth) {
    //   options.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.me.token});
    // }
    let ifmatch = localStorage.getItem('etag');
    console.log("apicall etag" + ifmatch);
    if (ifmatch) {
      options.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'If-Match': ifmatch });
    } else {
      options.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    assign(options.params, apiRequest.requestParams);

    let httpRequest;
    const baseUrl = 'https://scz09w2r28.execute-api.ap-south-1.amazonaws.com/dev';
    let url = baseUrl + apiRequest.requestUrl;

    if (apiRequest.requestMethod === 'GET') {
      httpRequest = this.http.get(url, options);
    } else if (apiRequest.requestMethod === 'POST') {
      console.log('upload url', url);
      httpRequest = this.http.post(url, apiRequest.requestPayload, { ...options, responseType: 'text' as 'text' });
    } else if (apiRequest.requestMethod === 'PUT') {
      httpRequest = this.http.put(url, apiRequest.requestPayload, options);
    } else if (apiRequest.requestMethod === 'DELETE') {
      httpRequest = this.http.delete(url, { ...options, responseType: 'text' as 'text' });
    }

    return httpRequest;
  }

  get(): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).get();
  }

  post(payload: any): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).post(payload);
  }

  upload(files: any, data: any = null): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).upload(files, data);
  }

  put(payload: any): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).put(payload);
  }

  delete(): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).delete();
  }

}
