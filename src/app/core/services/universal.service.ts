import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UniversalService {
  private isBrowser: boolean;
  private isServer: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);
  }

  /**
   * Indica si el código se está ejecutando en el navegador.
   */
  isRunningInBrowser(): boolean {
    return this.isBrowser;
  }

  /**
   * Indica si el código se está ejecutando en el servidor.
   */
  isRunningInServer(): boolean {
    return this.isServer;
  }
}
