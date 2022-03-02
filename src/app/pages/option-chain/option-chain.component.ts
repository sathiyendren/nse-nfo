import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-option-chain',
  templateUrl: './option-chain.component.html',
  styleUrls: ['./option-chain.component.css']
})
export class OptionChainComponent implements OnInit {
  constructor() {
    localStorage.setItem('login-page', 'false');
   }
  ngOnInit() {
  }

}
