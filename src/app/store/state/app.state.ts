import { TAppState } from '../../shared/types/app-state.type';
import { initialDetailsState } from './details.state';
import { initialListState } from './list.state';

export const initialAppState: TAppState = {
  list: initialListState,
  details: initialDetailsState,
};
