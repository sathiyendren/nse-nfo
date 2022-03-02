import * as _ from 'lodash';
import { ZerodhaService } from './zerodha.service';
import {InstrumentsService} from './instruments.service';
import { Injectable } from '@angular/core';

const zerodhaCandleIntervalMappings = [
  {
    interval: 1,
    key: 'minute'
  }, {
    interval: 3,
    key: '3minute'
  }, {
    interval: 5,
    key: '5minute'
  }, {
    interval: 10,
    key: '10minute'
  }, {
    interval: 15,
    key: '15minute'
  }, {
    interval: 30,
    key: '30minute'
  }, {
    interval: 60,
    key: '60minute'
  }
];

const getZerodhaCandleIntervalString = (interval = 5) => {
  const entry = _.find(zerodhaCandleIntervalMappings, entry => entry.interval === interval);
  return entry ? entry.key : '5minute';
};
@Injectable()

export class ZerodhaHistoryAPIs {
  kiteConnect;
  constructor(private zerodha: ZerodhaService, private instrumentsService: InstrumentsService) {
    this.kiteConnect = this.zerodha.getKiteConnect();
  }

  fetchHistory(tradingSymbol, interval, from, to) {
    const token = this.instrumentsService.getInstrumentToken(tradingSymbol);
    let intervalStr = '';
    if (_.isString(interval)) { // if input is like 'day', '3minute' etc.
      intervalStr = interval;
    } else { // if input is an integer like  1, 3, 5, 10..
      intervalStr = getZerodhaCandleIntervalString(interval);
    }

    return this.kiteConnect.getHistoricalData(token, intervalStr, from, to).then(candles => {
      _.each(candles, candle => {
        candle.timestamp = candle.date;
      });
      return candles;
    });
  }
}
