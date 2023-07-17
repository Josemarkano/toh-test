import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Category, Hero } from '../hero';

describe('Hero Detail Component test', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: HeroService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: { get: (key: string) => '1' } } } },
        HeroService,
        Location
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    location = TestBed.inject(Location);

    spyOn(location, 'back');
  });

  it('should create a hero detail component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch hero at start', () => {
    const hero: Hero = { id: 12, name: 'Dr. Nice', categoryId:1 };
    spyOn(heroService, 'getHero').and.returnValue(of(hero));

    component.ngOnInit();

    expect(component.hero).toEqual(hero);
    expect(heroService.getHero).toHaveBeenCalledWith(1);
  });

  it('should go back', () => {
    component.goBack();

    expect(location.back).toHaveBeenCalled();
  });

  it('should save hero', () => {
    const hero: Hero = { id: 24, name: 'iron-man', categoryId: 6 };
    spyOn(heroService, 'updateHero').and.returnValue(of(undefined));
    component.hero = hero;

    component.save();

    expect(heroService.updateHero).toHaveBeenCalledWith(hero);
    expect(location.back).toHaveBeenCalled();
  });

  it('should fetch categories at start', () => {
    const categories: Category[] = [
      { id: 1, description: 'mutant'},
      { id: 2, description: 'flyer'},
      { id: 3, description: 'fire'},
      { id: 4, description: 'fast'},
      { id: 5, description: 'alien'},
      { id: 6, description: 'human'},
    ];
    spyOn(heroService, 'getCategories').and.returnValue(of(categories));

    component.ngOnInit();

    expect(component.category).toEqual(categories);
    expect(heroService.getCategories).toHaveBeenCalled();
  });
});