import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  nom: string;
  email: string;
  entreprise?: string;
  sujet: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(payload: ContactPayload) {
    return this.http.post(`${environment.apiUrl}/api/contact`, payload);
  }
}
