import { TArticle } from './article-type';
import { TBackendError } from './backend-error.type';

export type TDetailsState = {
  article: TArticle | null;
  isLoading: boolean;
  error: TBackendError | null;
};
