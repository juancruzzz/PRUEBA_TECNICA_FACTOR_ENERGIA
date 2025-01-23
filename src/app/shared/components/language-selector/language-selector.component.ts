import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div *ngIf="mode === 'dropdown'" class="language-selector">
      <label for="language">{{ 'SELECT_LANGUAGE' | translate }}</label>
      <select id="language" (change)="changeLanguage($event)">
      <option value="es" [selected]="currentLang === 'es'">Español</option>
      <option value="en" [selected]="currentLang === 'en'">English</option>
      </select>
    </div>

    <div *ngIf="mode === 'compact'" class="language-compact">
      <span
        class="language-option"
        [class.active]="currentLang === 'es'"
        (click)="changeLanguage('es')"
      >
        ES
      </span>
      |
      <span
        class="language-option"
        [class.active]="currentLang === 'en'"
        (click)="changeLanguage('en')"
      >
        EN
      </span>
    </div>
  `,
  styles: [
    `
      .language-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        label {
          font-size: 0.9rem;
          color: #607d8b;
          font-weight: bold;
        }

        select {
          padding: 0.5rem;
          font-size: 0.9rem;
          border: 1px solid #b0bec5;
          border-radius: 5px;
          background-color: #ffffff;
          color: #455a64;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;

          &:hover {
            border-color: #1e88e5;
          }

          &:focus {
            border-color: #1e88e5;
            box-shadow: 0 0 4px rgba(30, 136, 229, 0.5);
          }
        }
      }

      .language-compact {
        display: flex;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #607d8b;
        font-weight: bold;

        .language-option {
          cursor: pointer;
          padding: 0.2rem 0.5rem;
          transition: color 0.3s ease, background-color 0.3s ease;

          &.active {
            color: #1e88e5;
            font-weight: bold;
            text-decoration: underline;
          }

          &:hover {
            color: #1e88e5;
          }
        }
      }
    `,
  ],
})
export class LanguageSelectorComponent implements OnInit {
  @Input() mode: 'dropdown' | 'compact' = 'dropdown';
  currentLang = 'en';

  constructor (
    private translateService: TranslateService,
    private cookieService: CookieService
  ) { }

  ngOnInit (): void {
    const savedLang = this.cookieService.get('language') || 'en';
    this.currentLang = savedLang;
    this.translateService.use(savedLang);
  }

  changeLanguage (event: Event | string): void {
    const lang = typeof event === 'string' ? event : (event.target as HTMLSelectElement).value;
    this.currentLang = lang;
    this.translateService.use(lang);
    this.cookieService.set('language', lang, undefined, '/');
  }
}
