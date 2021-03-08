import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersBranchsComponent } from './providers-branchs.component';

describe('ProvidersBranchsComponent', () => {
  let component: ProvidersBranchsComponent;
  let fixture: ComponentFixture<ProvidersBranchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersBranchsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersBranchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
