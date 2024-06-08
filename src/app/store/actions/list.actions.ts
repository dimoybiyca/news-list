import { createAction, props } from '@ngrx/store';
import { TArticle } from '../../shared/types/article-type';
import { TBackendError } from '../../shared/types/backend-error.type';
import { TGetArticlesResponse } from '../../shared/types/get-articles-response.type';

enum ActionTypes {
  GET_LIST = '[List] Get List',
  GET_LIST_SUCCESS = '[List] Get List Success',
  GET_LIST_FAILURE = '[List] Get List Failure',

  GET_NEXT_PAGE = '[List] Get Next Page',
  GET_NEXT_PAGE_SUCCESS = '[List] Get Next Page Success',
  GET_NEXT_PAGE_FAILURE = '[List] Get Next Page Failure',

  SET_SEARCH_TERM = '[List] Set Search Term',
}

export const getListAction = createAction(ActionTypes.GET_LIST);

export const getListSuccessAction = createAction(
  ActionTypes.GET_LIST_SUCCESS,
  props<{ response: TGetArticlesResponse }>()
);
export const getListFailureAction = createAction(
  ActionTypes.GET_LIST_FAILURE,
  props<{ error: TBackendError }>()
);

export const setSearchTermAction = createAction(
  ActionTypes.SET_SEARCH_TERM,
  props<{ searchTerm: string }>()
);

export const getNextPageAction = createAction(
  ActionTypes.GET_NEXT_PAGE,
  props<{ next: string }>()
);

export const getNextPageSuccessAction = createAction(
  ActionTypes.GET_NEXT_PAGE_SUCCESS,
  props<{ response: TGetArticlesResponse }>()
);

export const getNextPageFailureAction = createAction(
  ActionTypes.GET_NEXT_PAGE_FAILURE,
  props<{ error: TBackendError }>()
);
