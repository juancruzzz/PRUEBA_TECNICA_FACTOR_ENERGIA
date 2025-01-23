import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileData = new BehaviorSubject<Profile>({
    name: 'Juan Cruz',
    email: 'juan.cruz@example.com',
    signupDate: '2025-01-22',
    shippingAddress: 'Calle Frederic 123',
  });

  /**
   * Obtiene el perfil como un Observable
   */
  getProfile() {
    return this.profileData.asObservable();
  }

  /**
   * Actualiza el perfil con los nuevos datos
   * @param data Datos actualizados del perfil
   */
  updateProfile(data: Partial<Profile>) {
    const currentData = this.profileData.value;
    const updatedData = { ...currentData, ...data };
    this.profileData.next(updatedData);
  }
}
