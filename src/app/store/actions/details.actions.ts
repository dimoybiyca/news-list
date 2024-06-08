import { createAction, props } from '@ngrx/store';
import { TArticle } from '../../shared/types/article-type';
import { TBackendError } from '../../shared/types/backend-error.type';

enum ActionTypes {
  GET_ARTICLE = '[Details] Get Article',
  GET_ARTICLE_SUCCESS = '[Details] Get Article Success',
  GET_ARTICLE_FAILURE = '[Details] Get Article Failure',
}

export const getArticleAction = createAction(
  ActionTypes.GET_ARTICLE,
  props<{ id: number }>()
);

export const getArticleSuccessAction = createAction(
  ActionTypes.GET_ARTICLE_SUCCESS,
  props<{ article: TArticle }>()
);

export const getArticleFailureAction = createAction(
  ActionTypes.GET_ARTICLE_FAILURE,
  props<{ error: TBackendError }>()
);
