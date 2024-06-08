import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ArticleService } from '../../shared/services/article/article.service';
import { SnackBarService } from '../../shared/services/snack-bar/snack-bar.service';
import { TAppState } from '../../shared/types/app-state.type';
import { TGetArticlesResponse } from '../../shared/types/get-articles-response.type';
import {
  getListAction,
  getListFailureAction,
  getListSuccessAction,
  getNextPageAction,
  getNextPageFailureAction,
  getNextPageSuccessAction,
  setSearchTermAction,
} from '../actions/list.actions';
import { searchTermSelector } from '../selectors/list.selectors';

@Injectable()
export class ListEffects {
  private actions$: Actions = inject(Actions);
  private store: Store<TAppState> = inject(Store);
  private listService: ArticleService = inject(ArticleService);
  private snackBarService: SnackBarService = inject(SnackBarService);

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListAction),
      withLatestFrom(this.store.select(searchTermSelector)),
      switchMap(([action, search]) => {
        return this.listService.getArticles(search).pipe(
          map((response: TGetArticlesResponse) =>
            getListSuccessAction({ response })
          ),
          catchError((error) => of(getListFailureAction({ error })))
        );
      })
    )
  );

  loadNextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getNextPageAction),
      withLatestFrom(this.store.select(searchTermSelector)),
      switchMap(([action, search]) => {
        return this.listService.getNextPage(action.next, search).pipe(
          map((response: TGetArticlesResponse) =>
            getNextPageSuccessAction({ response })
          ),
          catchError((error) => of(getNextPageFailureAction({ error })))
        );
      })
    )
  );

  loadArticlesError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getListFailureAction),
        tap(() => {
          this.snackBarService.open('Failed to load articles');
        })
      ),
    { dispatch: false }
  );

  setSearchTerm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSearchTermAction),
      switchMap(() => of(getListAction()))
    )
  );
}
