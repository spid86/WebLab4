import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectComponentComponent } from './edit-project-component.component';

describe('EditProjectComponentComponent', () => {
  let component: EditProjectComponentComponent;
  let fixture: ComponentFixture<EditProjectComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProjectComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProjectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
