import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestourantCatalogComponent } from './restourant-catalog.component';

describe('RestourantCatalogComponent', () => {
  let component: RestourantCatalogComponent;
  let fixture: ComponentFixture<RestourantCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestourantCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestourantCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
