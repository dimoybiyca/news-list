import { createReducer, on } from '@ngrx/store';
import { initialListState } from '../state/list.state';
import {
  getListAction,
  getListFailureAction,
  getListSuccessAction,
  getNextPageAction,
  getNextPageFailureAction,
  getNextPageSuccessAction,
  setSearchTermAction,
} from '../actions/list.actions';

export const listReducers = createReducer(
  initialListState,
  on(setSearchTermAction, (state, action) => ({
    ...state,
    searchQuery: action.searchTerm,
  })),
  on(getListAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(getListSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
    next: action.response.next,
    articles: action.response.results,
    count: action.response.count,
  })),
  on(getListFailureAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(getNextPageAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(getNextPageSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
    next: action.response.next,
    articles: [...state.articles, ...action.response.results],
    count: action.response.count,
  })),
  on(getNextPageFailureAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
