import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getArticleAction } from '../store/actions/details.actions';
import { articleSelector } from '../store/selectors/details.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgIf, MatButtonModule, MatIconModule],
})
export class DetailsComponent implements OnInit {
  private id!: number;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private store = inject(Store);

  article$ = this.store.pipe(select(articleSelector));

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id === null) {
      this.router.navigate(['/']);
    }

    this.fetchData();
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ id: this.id }));
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
