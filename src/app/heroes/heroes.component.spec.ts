import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('Heroes Component Test', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
  });

  it('should create a heroes component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the heroes at start', () => {
    const heroes = [{ id: 11, name: 'Hero', categoryId: 5 }];
    spyOn(heroService, 'getHeroes').and.returnValue(of(heroes));

    component.ngOnInit();

    expect(component.heroes).toEqual(heroes);
    expect(heroService.getHeroes).toHaveBeenCalled();
  });

  it('should add a new hero', () => {
    const hero = 'New Hero';
    const categoryId = '1';
    const newHero = { id: -Infinity, name: hero, categoryId: +categoryId };
    spyOn(heroService, 'addHero').and.returnValue(of(newHero));

    component.add(hero, categoryId);

    expect(component.heroes.length).toBe(1);
    expect(component.heroes[0]).toEqual(newHero);
    expect(heroService.addHero).toHaveBeenCalledWith(newHero);
  });

  it(`shouldn't add a hero if name & categoryId is missing`, () => {
    spyOn(heroService, 'addHero');

    component.add('', '');

    expect(component.heroes.length).toBe(0);
    expect(heroService.addHero).not.toHaveBeenCalled();
  });

  it('should get the maximum heroID', () => {
    const heroes = [
      { id: 11, name: 'Hero', categoryId: 1 },
      { id: 13, name: 'Hero 3', categoryId: 2 },
      { id: 12, name: 'Hero 2', categoryId: 1 }
    ];
    component.heroes = heroes;
  
    const highId = Math.max(...component.heroes.map(hero => hero.id));
    
    expect(highId).toBe(13);
  });

  it('should delete a hero', () => {
    const heroToDelete = { id: 1, name: 'Hero', categoryId: 1 };
    component.heroes = [heroToDelete];
    spyOn(heroService, 'deleteHero').and.returnValue(of(heroToDelete));

    component.delete(heroToDelete);

    expect(component.heroes.length).toBe(0);
    expect(heroService.deleteHero).toHaveBeenCalledWith(heroToDelete.id);
  });

  it('should get the categories at start', () => {
    const categories = [{ id: 4, description: 'meta-human' }];
    spyOn(heroService, 'getCategories').and.returnValue(of(categories));

    component.ngOnInit();

    expect(component.categories).toEqual(categories);
    expect(heroService.getCategories).toHaveBeenCalled();
  });

  it('should get category description', () => {
    const categoryId = 3;
    const categories = [{ id: 3, description: 'Fire' }];

    component.categories = categories;

    const categoryDescription = component.getCategoryDescription(categoryId);

    expect(categoryDescription).toBe('Fire');
  });

  it(`should return empty when the category doesn't exist`, () => { 
    const categoryId = 2;
    const categories = [{ id: 1, description: 'mutante' }];

    component.categories = categories;
  
    const categoryDescription = component.getCategoryDescription(categoryId);
  
    expect(categoryDescription).toBe('');
  });
});