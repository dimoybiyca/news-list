import { TListState } from '../../shared/types/list-state.type';

export const initialListState: TListState = {
  searchTerm: '',
  count: 0,
  articles: [],
  next: null,
  isLoading: false,
  error: null,
};
