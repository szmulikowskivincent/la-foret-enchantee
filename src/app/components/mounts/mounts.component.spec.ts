import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountsComponent } from './mounts.component';

describe('MountsComponent', () => {
  let component: MountsComponent;
  let fixture: ComponentFixture<MountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MountsComponent]
    });
    fixture = TestBed.createComponent(MountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
