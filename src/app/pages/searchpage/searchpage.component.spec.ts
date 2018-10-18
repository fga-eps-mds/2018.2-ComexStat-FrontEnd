import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { SearchPageComponent } from './searchpage.component';

describe('SearchPageComponent', () => {

  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
