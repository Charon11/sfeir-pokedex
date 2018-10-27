import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMovesGridComponent } from './pokemon-moves-grid.component';

describe('PokemonMovesGridComponent', () => {
  let component: PokemonMovesGridComponent;
  let fixture: ComponentFixture<PokemonMovesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonMovesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonMovesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
