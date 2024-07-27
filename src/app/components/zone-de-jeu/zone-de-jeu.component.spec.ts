import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDeJeuComponent } from './zone-de-jeu.component';

describe('ZoneDeJeuComponent', () => {
  let component: ZoneDeJeuComponent;
  let fixture: ComponentFixture<ZoneDeJeuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneDeJeuComponent]
    });
    fixture = TestBed.createComponent(ZoneDeJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
