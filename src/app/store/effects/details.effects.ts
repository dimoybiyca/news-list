import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticleService } from '../../shared/services/article/article.service';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/details.actions';
import { SnackBarService } from '../../shared/services/snack-bar/snack-bar.service';

@Injectable()
export class DetailsEffects {
  private actions$: Actions = inject(Actions);
  private listService: ArticleService = inject(ArticleService);
  private snackBarService: SnackBarService = inject(SnackBarService);

  loadArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getArticleAction),
      switchMap((action) => {
        return this.listService.getArticle(action.id).pipe(
          map((article) => getArticleSuccessAction({ article })),
          catchError((error) => of(getArticleFailureAction({ error })))
        );
      })
    );
  });

  loadArticleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getArticleFailureAction),
        tap(() => {
          this.snackBarService.open('Failed to load article');
        })
      ),
    { dispatch: false }
  );
}
