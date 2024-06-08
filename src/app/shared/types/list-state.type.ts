import { TArticle } from './article-type';
import { TBackendError } from './backend-error.type';

export type TListState = {
  searchQuery: string;
  articles: TArticle[];
  isLoading: boolean;
  next: string | null;
  error: TBackendError | null;
  count: number;
};
