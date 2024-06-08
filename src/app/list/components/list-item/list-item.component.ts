import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HighlightCommonDirective } from '../../../shared/directives/higlight-common/highlight-common.directive';
import { OrdinalDatePipe } from '../../../shared/pipes/ordinal-date/ordinal-date.pipe';
import { TArticle } from '../../../shared/types/article-type';
import { searchTermSelector } from '../../../store/selectors/list.selectors';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    OrdinalDatePipe,
    AsyncPipe,
    HighlightCommonDirective,
  ],
  providers: [HighlightCommonDirective],
})
export class ListItemComponent {
  @Input() article: TArticle | null = null;

  private store = inject(Store);
  private router: Router = inject(Router);

  searchTerm$: Observable<string | null> = this.store.pipe(
    select(searchTermSelector)
  );

  onReadMore(): void {
    if (!this.article) {
      return;
    }

    this.router.navigate(['/article', this.article.id]);
  }
}
