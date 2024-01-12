import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverimageComponent } from './coverimage.component';

describe('CoverimageComponent', () => {
  let component: CoverimageComponent;
  let fixture: ComponentFixture<CoverimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoverimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoverimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
