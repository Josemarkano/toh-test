import { Component, OnInit } from '@angular/core';

import { Hero, Category } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  categories: Category[] = []
  selectedCategory: number | null = null;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getCategories();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string, categoryId: string): void {
    name = name.trim();
    if (!name || !categoryId) { return; }
    const highId = Math.max(...this.heroes.map(hero => hero.id))
    const hero: Hero = {
      id: highId + 1,
      name: name,
      categoryId: Number(categoryId)
    }
    this.heroService.addHero(hero)
      .subscribe(newHero => {
        this.heroes.push(newHero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }



  getCategories() {
    this.heroService.getCategories()
      .subscribe(categories => this.categories = categories)
  }

  getCategoryDescription(categoryId: number): string {
    const category = this.categories.find(heroCategory => heroCategory.id === categoryId);
    return category ? category.description : '';
  }

}
