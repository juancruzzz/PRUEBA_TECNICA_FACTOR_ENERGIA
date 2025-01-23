import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;
  private authState = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Inicializa el estado según el token
    if (this.isBrowser) {
      const token = this.cookieService.get('authToken');
      this.authState.next(!!token);
    }
  }

  /**
   * Retorna el estado de autenticación como un Observable
   */
  isAuthenticated$ = this.authState.asObservable();

  /**
   * Retorna el estado actual de autenticación
   */
  isAuthenticated(): boolean {
    return this.authState.value;
  }

  /**
   * Guarda el token de autenticación
   */
  login(token: string): void {
    if (this.isBrowser) {
      this.cookieService.set('authToken', token, undefined, '/');
      this.authState.next(true);
    }
  }

  /**
   * Cierra sesión y elimina el token
   */
  logout(): void {
    if (this.isBrowser) {
      this.cookieService.delete('authToken', '/');
      this.authState.next(false);
    }
  }
}
