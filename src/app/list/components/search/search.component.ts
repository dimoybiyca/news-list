import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() searchChange: EventEmitter<string> = new EventEmitter();

  searchTerm: string = '';
  inputUpdate: Subject<string> = new Subject();
  private destroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.inputUpdate
      .pipe(takeUntil(this.destroy$), debounceTime(400), distinctUntilChanged())
      .subscribe((text) => {
        this.searchChange.emit(text);
      });
  }

  onSearchChange(text: string): void {
    this.inputUpdate.next(text);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
