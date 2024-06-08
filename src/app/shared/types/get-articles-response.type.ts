import { TArticle } from './article-type';

export type TGetArticlesResponse = {
  count: number;
  next: string | null;
  results: TArticle[];
};
