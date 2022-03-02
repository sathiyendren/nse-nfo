import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {
  name: string = "";
  email: string = "";
  job: string = "";
  address: string = "";
  selectedSource: string = "email";
  selectedGender: string = "male";
  isCompany : boolean = false;
  createdAt = new FormControl(new Date());

  name1: string = "";
  email1: string = "";
  job1: string = "";
  address1: string = "";
  selectedSource1: string = "email";
  selectedGender1: string = "male";
  isCompany1 : boolean = false;
  createdAt1 = new FormControl(new Date());
  tiles: any[] = [
    
  ];
  constructor() {
    localStorage.setItem('login-page', 'false');
   }
  public addOptions() {
    this.tiles.push({text: 'One', color: 'lightblue'});
  }
  ngOnInit() {
  }

}
