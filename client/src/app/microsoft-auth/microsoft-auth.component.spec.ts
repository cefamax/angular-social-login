import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrosoftAuthComponent } from './microsoft-auth.component';

describe('MicrosoftAuthComponent', () => {
  let component: MicrosoftAuthComponent;
  let fixture: ComponentFixture<MicrosoftAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrosoftAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrosoftAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
