import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { userCredential, serverConfig } from '../utils/config';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
  basePath = `${serverConfig.host}:${serverConfig.port}/v1`;
  userDetails: any;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {
  }

  getToken() {
    return `bearer ${this.userDetails.tokens['access'].token}`;
  }

  getUserId() {
    return this.userDetails.user.id;
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return 'Something bad happened; please try again later.';
  }

  login() {
    const loginURL = `${this.basePath}/auth/login`;
    console.log(loginURL);
    return this.http
      .post<any>(loginURL, JSON.stringify(userCredential), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserSetting() {
    const userId = this.getUserId();
    const token = this.getToken();
    const settingURL = `${this.basePath}/settings/user/${userId}`;
    console.log(settingURL);
    this.httpOptions.headers.append('Authorization', token);
    return this.http
      .get<any>(settingURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateUserSetting(setting) {
    const token = this.getToken();
    const userId = this.getUserId();
    const settingURL = `${this.basePath}/settings/user/${userId}`;
    console.log(settingURL);
    this.httpOptions.headers.append('Authorization', token);
    return this.http
      .patch<any>(settingURL, JSON.stringify(setting), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  refreshZerodhaConfiguration() {
    const userId = this.getUserId();
    const token = this.getToken();
    const zerodhaURL = `${this.basePath}/zerodha/refresh`;
    console.log(zerodhaURL);
    this.httpOptions.headers.append('Authorization', token);
    return this.http
      .get<any>(zerodhaURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
