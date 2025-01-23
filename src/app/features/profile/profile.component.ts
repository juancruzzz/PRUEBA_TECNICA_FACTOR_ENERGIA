import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../../core/services/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, TranslateModule],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) { }

  ngOnInit (): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      signupDate: [{ value: '', disabled: true }],
      shippingAddress: ['', Validators.required],
    });

    this.profileService.getProfile().subscribe((data) => {
      this.profileForm.patchValue(data);
    });
  }

  onSubmit (): void {
    if (this.profileForm.valid) {
      this.profileService.updateProfile(this.profileForm.value);
      this.toastr.success('Perfil actualizado correctamente', 'Éxito');
    } else {
      this.toastr.error('Algo salió mal', 'Error');
    }
  }
}
