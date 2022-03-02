/*
  Author: Sreenivas Doosa
*/

import { KiteTicker } from 'kiteconnect';
import { InstrumentsService } from './instruments.service';
import { ZerodhaService } from './zerodha.service';
import * as _ from 'lodash';

export class ZerodhaTickerService {
  ticker;
  symbols;
  listeners;
  connected;
  constructor(
    private zerodha: ZerodhaService,
    private instrumentsService: InstrumentsService
  ) {
    const apiKey = this.zerodha.getAPIKey();
    const session: any = this.zerodha.getSession();

    this.ticker = new KiteTicker({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      api_key: apiKey,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      access_token: session.access_token,
    });

    this.symbols = [];
    this.listeners = [];

    this.onConnected = this.onConnected.bind(this);
    this.onDisConnected = this.onDisConnected.bind(this);
    this.onTicks = this.onTicks.bind(this);
  }

  registerListener(listener) {
    if (_.isEmpty(listener) === false) {
      this.listeners.push(listener);
    }
  }

  unregisterListener(listener) {
    if (_.isEmpty(listener) === false) {
      this.listeners = _.filter(this.listeners, (l) => l !== listener);
    }
  }

  registerSymbols(data) {
    // input can be a string or an array of strings
    const tokens = [];
    if (_.isArray(data)) {
      _.each(data, (symbol) => {
        const token = this.instrumentsService.getInstrumentToken(symbol);
        tokens.push(token);

        if (_.some(this.symbols, (s) => s === symbol) === false) {
          this.symbols.push(symbol);
        }
      });
    } else {
      const symbol = data;
      const token = this.instrumentsService.getInstrumentToken(symbol);
      tokens.push(token);

      if (_.some(this.symbols, (s) => s === symbol) === false) {
        this.symbols.push(symbol);
      }
    }

    if (this.connected) {
      this.subscribe(tokens);
    }
  }

  unregisterSymbols(data) {
    const tokens = [];
    if (_.isArray(data)) {
      _.each(data, (symbol) => {
        const token = this.instrumentsService.getInstrumentToken(symbol);
        tokens.push(token);

        _.remove(this.symbols, (s) => s === symbol);
      });
    } else {
      const symbol = data;
      const token = this.instrumentsService.getInstrumentToken(symbol);
      tokens.push(token);

      _.remove(this.symbols, (s) => s === symbol);
    }

    if (this.connected) {
      this.unsubscribe(tokens);
    }
  }

  connect() {
    this.ticker.autoReconnect(true, 10, 5); // 10 retries with interval of 5 seconds
    this.ticker.connect();
    this.ticker.on('ticks', this.onTicks);
    this.ticker.on('connect', this.onConnected);

    this.ticker.on('noreconnect', () => {
      console.error(
        'Zerodha ticker failed to reconnect after maxim re-attemtps'
      );
      this.onDisConnected();
    });

    this.ticker.on('reonnecting', (reconnectInterval, reconnections) => {
      console.warn(
        `Zerodha ticker: Reconnecting: attempts ${reconnections} and interval ${reconnectInterval}`
      );
    });
  }

  disconnect() {
    console.log(`Zerodha ticker disconnect request receievd..`);
    if (this.ticker) {
      this.ticker.disconnect();
      this.onDisConnected();
    }
  }

  onConnected() {
    console.log('Zerodha ticker connected...');
    this.connected = true;

    const tokens = [];
    _.each(this.symbols, (symbol) => {
      const token = this.instrumentsService.getInstrumentToken(symbol);
      tokens.push(token);
    });

    this.subscribe(tokens);

    // logrm all listeners
    _.each(this.listeners, (listener) => {
      if (_.isFunction(listener.onConnected)) {
        listener.onConnected();
      }
    });
  }

  onDisConnected() {
    console.error('[ALERT] Zerodha ticker disconnected...');
    this.connected = false;

    // logrm all listeners
    _.each(this.listeners, (listener) => {
      if (_.isFunction(listener.onDisConnected)) {
        listener.onDisConnected();
      }
    });
  }

  isConnected() {
    return this.connected;
  }

  subscribe(tokens) {
    // convert strings (if any) to integers
    tokens = _.map(tokens, (t) => _.toInteger(t));

    console.log('zerodha subscribe tokens = ' + tokens.join(','));
    this.ticker.subscribe(tokens);
    this.ticker.setMode(this.ticker.modeFull, tokens);
  }

  unsubscribe(tokens) {
    // convert strings (if any) to integers
    tokens = _.map(tokens, (t) => _.toInteger(t));

    console.log('zerodha unsubscribe tokens = ' + tokens.join(','));
    this.ticker.unsubscribe(tokens);
  }

  onTicks(ticks) {
    console.log('zerodha ticks => ', ticks);

    _.each(ticks, (tick) => {
      const liveQuote = {
        tradingSymbol: this.instrumentsService.getTradingSymbolByInstrumentToken(
          tick.instrument_token
        ),
        cmp: parseFloat(tick.last_price),
        open: parseFloat(tick.ohlc.open),
        high: parseFloat(tick.ohlc.high),
        low: parseFloat(tick.ohlc.low),
        close: parseFloat(tick.ohlc.close),
        volume: parseInt(tick.volume, 10),
        averagePrice: parseFloat(tick.average_price),
        change: parseFloat(tick.change),
      };

      _.each(this.listeners, (listener) => {
        if (_.isFunction(listener.onTick)) {
          listener.onTick(liveQuote);
        }
      });
    });
  }
}
