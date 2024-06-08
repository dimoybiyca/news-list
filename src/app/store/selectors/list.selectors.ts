import { createSelector } from '@ngrx/store';
import { TAppState } from '../../shared/types/app-state.type';
import { TListState } from '../../shared/types/list-state.type';

export const listSelector = (store: TAppState) => store.list;

export const articlesSelector = createSelector(
  listSelector,
  (list: TListState) => list.articles
);

export const searchQuerySelector = createSelector(
  listSelector,
  (list: TListState) => list.searchQuery
);

export const countSelector = createSelector(
  listSelector,
  (list: TListState) => list.count
);

export const nextSelector = createSelector(
  listSelector,
  (list: TListState) => list.next
);

export const isLoadingSelector = createSelector(
  listSelector,
  (list: TListState) => list.isLoading
);
