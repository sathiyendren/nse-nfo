import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { KiteConnect } from 'kiteconnect';
import { apiConfig } from '../../utils/config';
import { InstrumentsService } from './instruments.service';
import { WebsocketService } from './../websocket.service';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';

const CHAT_URL = 'ws://localhost:8080/';

export interface Message {
  author: string;
  message: string;
}

const config = apiConfig;
@Injectable()
export class ZerodhaService {
  kiteConnect: any = null;
  session: any = null;
  accessToken: any = null;
  public messages: Subject<Message>;

  constructor(
    private instruments: InstrumentsService,
    wsService: WebsocketService
  ) {
    const apiKey = this.getAPIKey();

    if (_.isEmpty(apiKey)) {
      console.error('Zerodha API key not configured..');
      //throw 'Zerodha API Key missing in config';
    }

    console.log('Zerodha API key  = ' + apiKey);

    this.kiteConnect = new KiteConnect({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      api_key: apiKey,
      debug: _.get(config, 'debug'),
    });

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.messages = <Subject<Message>>(
      wsService.connect(CHAT_URL).pipe(map((response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message,
        };
      }))
    );
  }

  getAPIKey() {
    return _.get(config, 'apiKey');
  }

  getAPISecret() {
    return _.get(config, 'apiSecret');
  }

  getPin() {
    return _.get(config, 'pin');
  }

  isLoggedIn() {
    return this.session ? true : false;
  }

  setSession(session) {
    this.session = session;
  }

  getSession() {
    return this.session;
  }

  getKiteConnect() {
    return this.kiteConnect;
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  getAccessToken() {
    return this.session && this.session.access_token
      ? this.session.access_token
      : this.accessToken;
  }

  login(requestToken) {
    return new Promise((resolve) => {
      if (_.isEmpty(requestToken) === false) {
        // Now get the access token after successful login
        this.kiteConnect
          .generateSession(requestToken, this.getAPISecret())
          .then((session) => {
            console.log('Login successful...');
            this.setSession(session);
            resolve({ success: true, accessToken: this.getAccessToken() });
            // res.redirect(302, '/?broker=zerodha');
          })
          .catch((err) => {
            console.error('generateSession failed => ', err);
            resolve({ success: false, accessToken: null });
            // res.status(500).send({
            //   error: 'Could not generate kite session',
            //   details: err,
            // });
          });
      } else {
        console.log(`login url => ${this.kiteConnect.getLoginURL()}`);
        resolve({ success: false, loginURL: this.kiteConnect.getLoginURL() });
        // res.redirect(302, this.kiteConnect.getLoginURL());
      }
    });
  }

  logout(req, res) {
    if (!this.isLoggedIn()) {
      return res.status(400).send({
        error: 'Not logged in',
      });
    }

    this.kiteConnect.invalidateAccessToken();
    this.setSession(null);

    res.status(200).send({
      message: 'Logout successful',
    });
    console.log('Successfully logged out from the session');
  }

  loadInstruments() {
    return this.kiteConnect
      .getInstruments('NFO')
      .then((data) => {
        this.instruments.setInstruments(data);
        console.log(`Zerodha: instruments loaded. count = ${data.length}`);
        return data;
      })
      .catch((err) => {
        console.error(`Zerodha: failed to load instruments.`, err);
      });
  }
}
