import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MyMaterialModule } from "./material.module";

// Pages
import { CustomerListComponent } from "./pages/customer-list/customer-list.component";
import { CustomerCreateComponent } from "./pages/customer-create/customer-create.component";
import { LoginComponent } from "./pages/login/login.component";
import { ErrorComponent } from "./error.component";
import { TradingComponent } from "./pages/trading/trading.component";
import { TransactionsComponent } from "./pages/transactions/transactions.component";
import { OptionChainComponent } from "./pages/option-chain/option-chain.component";
import { SettingComponent } from "./pages/setting/setting.component";

// Services
import { AlgomojoService } from "./services/algomojo.service";
import { LoginService } from "./services/login.service";
import { MongodbService } from "./services/mongodb.service";
import { UserService } from "./services/user.service";
import { WebsocketService } from "./services/websocket.service";
import { TradingCardComponent } from "./components/trading-card/trading-card.component";
import { ZerodhaService } from "./services/zerodha/zerodha.service";
import { InstrumentsService } from "./services/zerodha/instruments.service";
// import { ZerodhaTickerService } from "./services/zerodha/zerodha-ticker.service";
// import { ZerodhaOrderManagerService } from "./services/zerodha/zerodha-order-manager.service";
// import { ZerodhaHistoryAPIs } from "./services/zerodha/zerodha-history-apis.service";

// Components

const appRoutes: Routes = [
  { path: "trading", component: TradingComponent },
  { path: "transactions", component: TransactionsComponent },
  { path: "option-chain", component: OptionChainComponent },
  { path: "setting", component: SettingComponent },
  //
  { path: "customer-list", component: CustomerListComponent },
  { path: "customer-create", component: CustomerCreateComponent },
  {
    path: "login",
    component: LoginComponent,
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    ErrorComponent,
    TradingComponent,
    TransactionsComponent,
    OptionChainComponent,
    SettingComponent,
    TradingCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MyMaterialModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  entryComponents: [ErrorComponent],
  providers: [
    AlgomojoService,
    LoginService,
    MongodbService,
    UserService,
    WebsocketService,
    ZerodhaService,
    InstrumentsService
    // ZerodhaTickerService,
    // ZerodhaOrderManagerService,
    // ZerodhaHistoryAPIs
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
