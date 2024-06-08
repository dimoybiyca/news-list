import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { TArticle } from '../../../shared/types/article-type';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-articles-grid',
  templateUrl: './articles-grid.component.html',
  styleUrl: './articles-grid.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatGridListModule,
    AsyncPipe,
    ListItemComponent,
    InfiniteScrollDirective,
  ],
})
export class ArticlesGridComponent implements OnInit {
  @Input() articles: TArticle[] = [];

  @Output() scrolled: EventEmitter<void> = new EventEmitter();

  cols: number = 3;

  ngOnInit(): void {
    this.setCols(window.innerWidth);
  }

  onResize($event: UIEvent): void {
    this.setCols((<Window>$event.target).innerWidth);
  }

  onScroll(): void {
    this.scrolled.emit();
  }

  private setCols(width: number): void {
    if (width <= 840) {
      this.cols = 1;
    } else if (width <= 1260) {
      this.cols = 2;
    } else {
      this.cols = 3;
    }
  }
}
