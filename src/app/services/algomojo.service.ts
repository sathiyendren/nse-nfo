import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { serverConfig } from '../utils/config';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class AlgomojoService {
  basePath = `${serverConfig.host}:${serverConfig.port}/v1`;
  userDetails: any;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}


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

  placeSingleOrder(data) {
    // const algomojoSingleOrder = `https://tcapi.algomojo.com/1.0/PlaceOrder`;
    const zerodhaURL = `${this.basePath}/zerodha/placeSingleOrder`;
    console.log(zerodhaURL);
    const body = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      api_key: '85289b1e81846e7ee85fd40996a7cfad',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      api_secret: '118dbb1d021f859e1aafebc5bff0ab03',
      data,
    };
    console.log(body);
    return this.http
      .post<any>(zerodhaURL, JSON.stringify(body), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  placeMultipleOrder(data) {
    // const algomojoMultiOrder = `https://tcapi.algomojo.com/1.0/PlaceMultiOrder`;
    const zerodhaURL = `${this.basePath}/zerodha/placeMultipleOrder`;
    console.log(zerodhaURL);
    const body = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      api_key: '85289b1e81846e7ee85fd40996a7cfad',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      api_secret: '118dbb1d021f859e1aafebc5bff0ab03',
      data,
    };
    console.log(body);
    return this.http
      .post<any>(zerodhaURL, JSON.stringify(body), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
