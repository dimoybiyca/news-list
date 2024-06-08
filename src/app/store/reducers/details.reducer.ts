import { createReducer, on } from '@ngrx/store';
import { initialDetailsState } from '../state/details.state';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/details.actions';

export const detailsReducers = createReducer(
  initialDetailsState,
  on(getArticleAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(getArticleSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
    article: action.article,
  })),
  on(getArticleFailureAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
