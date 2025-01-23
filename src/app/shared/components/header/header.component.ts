import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";

@Component({
  selector: 'app-header',
  standalone: true,templateUrl: './header.component.html',
  imports: [RouterModule, TranslateModule, LanguageSelectorComponent],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.userName = data.name;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
