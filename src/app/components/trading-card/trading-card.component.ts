import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-trading-card',
  templateUrl: './trading-card.component.html',
  styleUrls: ['./trading-card.component.css']
})
export class TradingCardComponent implements OnInit {
  name: string = "";
  email: string = "";
  job: string = "";
  address: string = "";
  selectedSource: string = "email";
  selectedGender: string = "male";
  isCompany : boolean = false;
  createdAt = new FormControl(new Date());
  
  constructor() {
    localStorage.setItem('login-page', 'false');
   }
  public onBuy(optionForm){
    debugger;
  }
  ngOnInit() {
  }

}
