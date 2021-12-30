import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { RouterParams } from './router-state.interface';
import { RouterState } from './router.state';
import { PersonState } from './person.state';
import { SearchState } from './search.state';
import { MovieState } from './movie.state';
import { DiscoverState } from './discover.state';

/**
 * This service manages data fetching based on router params
 */
@Injectable({
  providedIn: 'root',
})
export class RouterEffects extends RxState<any> {
  constructor(
    private routerState: RouterState,
    private discoverState: DiscoverState,
    private personState: PersonState,
    private searchState: SearchState,
    private movieState: MovieState
  ) {
    super();
  }

  // The routerState will initially emit the current params
  // Initially only resources present in the current URL are loaded, not all the listed once
  init = () =>
    this.hold(this.routerState.routerParams$, this.routerFetchEffect);

  private routerFetchEffect = ({ layout, type, identifier }: RouterParams) => {
    if (type === 'category') {
      this.movieState.fetchCategoryMovies({ category: identifier });
    } else if (type === 'genre') {
      this.discoverState.fetchGenreMovies(identifier);
    } else if (type === 'search') {
      this.searchState.fetchSearchMovies(identifier);
    } else if (layout === 'detail' && type === 'movie') {
      this.movieState.fetchMovie(identifier);
    } else if (layout === 'detail' && type === 'person') {
      this.personState.fetchPerson(identifier);
    }
  };
}
