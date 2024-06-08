import { ActionReducerMap } from '@ngrx/store';
import { TAppState } from '../../shared/types/app-state.type';
import { listReducers } from './list.reducer';
import { detailsReducers } from './details.reducer';

export const appReducers: ActionReducerMap<TAppState> = {
  list: listReducers,
  details: detailsReducers,
};
