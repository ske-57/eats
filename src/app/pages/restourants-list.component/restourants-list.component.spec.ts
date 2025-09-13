import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestourantsListComponent } from './restourants-list.component';

describe('RestourantsListComponent', () => {
  let component: RestourantsListComponent;
  let fixture: ComponentFixture<RestourantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestourantsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestourantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
