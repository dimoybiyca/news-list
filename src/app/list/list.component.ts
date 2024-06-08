import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TArticle } from '../shared/types/article-type';
import {
  getListAction,
  getNextPageAction,
  setSearchTermAction,
} from '../store/actions/list.actions';
import {
  articlesSelector,
  countSelector,
  isLoadingSelector,
  nextSelector,
} from '../store/selectors/list.selectors';
import { ArticlesGridComponent } from './components/articles-grid/articles-grid.component';
import { DividerComponent } from './components/divider/divider.component';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SearchComponent,
    DividerComponent,
    AsyncPipe,
    NgIf,
    ArticlesGridComponent,
  ],
})
export class ListComponent implements OnInit {
  private store = inject(Store);

  articles$: Observable<TArticle[]> = this.store.pipe(select(articlesSelector));
  count$: Observable<number> = this.store.pipe(select(countSelector));
  isLoading$: Observable<boolean> = this.store.pipe(select(isLoadingSelector));
  next: string | null = null;

  onSearchChange(searchTerm: string): void {
    this.store.dispatch(setSearchTermAction({ searchTerm }));
  }

  ngOnInit(): void {
    this.store.dispatch(getListAction());
    this.store.pipe(select(nextSelector)).subscribe((next) => {
      this.next = next;
    });
  }

  onScroll(): void {
    if (!this.next) {
      return;
    }

    this.store.dispatch(getNextPageAction({ next: this.next }));
  }
}
