import { createSelector } from '@ngrx/store';
import { TAppState } from '../../shared/types/app-state.type';
import { TDetailsState } from '../../shared/types/details-state.type';

export const detailsSelector = (store: TAppState) => store.details;

export const articleSelector = createSelector(
  detailsSelector,
  (list: TDetailsState) => list.article
);

export const isLoadingSelector = createSelector(
  detailsSelector,
  (list: TDetailsState) => list.isLoading
);


export const errorSelector = createSelector(
  detailsSelector,
  (list: TDetailsState) => list.error
);