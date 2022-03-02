import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionChainComponent } from './option-chain.component';

describe('OptionChainComponent', () => {
  let component: OptionChainComponent;
  let fixture: ComponentFixture<OptionChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
