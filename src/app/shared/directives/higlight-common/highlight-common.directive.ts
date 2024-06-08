import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[appHighlightCommon]',
  standalone: true,
})
export class HighlightCommonDirective implements OnChanges {
  @Input() appHighlightCommon: string | null = null;
  @Input() searchQuery: string | null = null;

  private el: ElementRef = inject(ElementRef);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private renderer: Renderer2 = inject(Renderer2);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlightCommon'] || changes['searchQuery']) {
      this.updateHighlight();
    }
  }

  updateHighlight(): void {
    if (!this.appHighlightCommon) {
      return;
    }

    this.setHtmlContent(
      this.searchQuery
        ? this.highlight(this.appHighlightCommon, this.searchQuery)
        : this.appHighlightCommon
    );
  }

  setHtmlContent(html: SafeHtml): void {
    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.sanitizer.sanitize(1, html)
    );
  }

  highlight(value: string, search: string): string {
    if (!search || !value) {
      return value;
    }

    const terms = search.split(' ');
    const words = value.split(' ');
    const length = words.length;

    for (let i = 0; i < length; i++) {
      if (terms.some((term) => this.equalsIgnoreCasing(term, words[i]))) {
        for (let j = i; j < length; j++) {
          if (
            j + 1 < length &&
            terms.some((term) => this.equalsIgnoreCasing(term, words[j + 1]))
          ) {
            continue;
          }

          words[i] = `<span class="highlight">${words[i]}`;
          words[j] = `${words[j]}</span>`;
          break;
        }
      }
    }

    return words.join(' ');
  }

  private equalsIgnoreCasing(a: string, b: string): boolean {
    return a.toLowerCase() === b.toLowerCase();
  }
}
