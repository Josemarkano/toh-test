import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

describe('Hero Search Component Test', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService: HeroService;

  const heroes: Hero[] = [
    { id: 12, name: 'Dr. Nice', categoryId: 1 },
    { id: 13, name: 'bombasto', categoryId: 3 },
    { id: 23, name: 'Superman', categoryId: 5 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ HeroService ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    spyOn(heroService, 'searchHeroes').and.returnValue(of(heroes));
    fixture.detectChanges();
  });

  it('should create hero search componen', () => {
    expect(component).toBeTruthy();
  });

  it('should search for the heroes', fakeAsync(() => {
    const searchTerm = 'search-term';
    const lowercaseSearchTerm = searchTerm.toLowerCase();
  
    component.search(searchTerm);
    tick(300); // Wait for the debounceTime to complete 
  
    component.search(searchTerm.toUpperCase());
    tick(300); // wait for the debounceTime to complete 
  
    expect(heroService.searchHeroes).toHaveBeenCalledTimes(1);
    expect(heroService.searchHeroes).toHaveBeenCalledWith(lowercaseSearchTerm);
  }));
});