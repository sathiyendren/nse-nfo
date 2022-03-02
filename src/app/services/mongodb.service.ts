import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { userCredential, serverConfig } from '../utils/config';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import axios from 'axios';

const zerodhaURLs = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ZERODHA_OHLC: 'https://api.kite.trade/quote/ohlc?',
};



@Injectable()
export class MongodbService {
  basePath = `${serverConfig.host}:${serverConfig.port}/v1`;
  userDetails: any;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private userService: UserService) {}

  getToken() {
    return `bearer ${this.userService.userDetails.tokens['access'].token}`;
  }

  getUserId() {
    return this.userService.userDetails.user.id;
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

  getAllOptionScriptForToday() {
    const userId = this.getUserId();
    const token = this.getToken();
    const optionScriptURL = `${this.basePath}/optionScripts`;
    console.log(optionScriptURL);
    this.httpOptions.headers.append('Authorization', token);
    console.log(this.httpOptions);
    return this.http
      .get<any>(optionScriptURL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllOptionScriptsLTP(tradingSymbols) {
    return new Promise((resolve) => {
      const apiKey = this.userService.userDetails.setting.zerodhaApiKey;
      const accessToken =
        this.userService.userDetails.setting.zerodhaAccessToken;
      let symbols = '';
      if (tradingSymbols) {
        tradingSymbols.forEach((tradingSymbol) => {
          symbols = `${symbols}&i=${tradingSymbol}`;
        });
        const zerodhaOHLCURL = `${zerodhaURLs.ZERODHA_OHLC}${symbols}`;
        console.log(`zerodhaOHLCURL :${zerodhaOHLCURL}`);
        axios
          .get(zerodhaOHLCURL, {
            headers: { Authorization: `token ${apiKey}:${accessToken}` },
          })
          .then((response) => {
            const responseData = response.data;
            resolve(responseData);
          })
          .catch((error) => {
            console.log(`Error: ${error.message}`);
            resolve(null);
          });
      } else {
        resolve(null);
      }
    });
  }
}
