import { TDetailsState } from './details-state.type';
import { TListState } from './list-state.type';

export type TAppState = {
  list: TListState;
  details: TDetailsState;
};
