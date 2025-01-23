import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from "./shared/components/header/header.component";
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    TranslateModule,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PRUEBA_TECNICA_FACTOR_ENERGIA';
  isAuthenticated = false;
  constructor (private authService: AuthService, private router: Router) { 

  }

  ngOnInit (): void {
    this.authService.isAuthenticated$.subscribe((authState) => {
      this.isAuthenticated = authState;

      if (!authState && this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    });
  }
}
