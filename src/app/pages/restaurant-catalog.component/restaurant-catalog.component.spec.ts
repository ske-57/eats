import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCatalogComponent } from './restaurant-catalog.component';

describe('RestaurantCatalogComponent', () => {
  let component: RestaurantCatalogComponent;
  let fixture: ComponentFixture<RestaurantCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
