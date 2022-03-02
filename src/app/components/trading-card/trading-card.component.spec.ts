import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingCardComponent } from './trading-card.component';

describe('TradingCardComponent', () => {
  let component: TradingCardComponent;
  let fixture: ComponentFixture<TradingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
