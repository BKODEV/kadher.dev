import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, IconComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly fb = new FormBuilder().nonNullable;
  private readonly contactService = inject(ContactService);

  readonly subjects = [
    'Demande de projet',
    'Internalisation IT / Infrastructure',
    'Conseil / Accompagnement',
    'Juste pour dire bonjour',
  ] as const;

  readonly sent = signal(false);
  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    org: [''],
    kind: ['Demande de projet'],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  errorFor(control: 'name' | 'email' | 'message'): string | null {
    const c = this.form.controls[control];
    if (!c.touched || c.valid) return null;
    if (c.hasError('required')) return 'Requis';
    if (c.hasError('email')) return 'E-mail invalide';
    if (c.hasError('minlength')) return 'Quelques mots de plus (20+ caractères)';
    return null;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.submitting()) return;

    this.submitting.set(true);
    this.error.set(null);

    const { name, email, org, kind, message } = this.form.getRawValue();

    this.contactService.send({
      nom: name,
      email,
      entreprise: org || undefined,
      sujet: kind,
      message,
    }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.sent.set(true);
      },
      error: (err) => {
        this.submitting.set(false);
        if (err.status === 429) {
          this.error.set('Trop de tentatives. Réessayez dans une heure.');
        } else {
          this.error.set('Une erreur est survenue. Réessayez ou contactez-moi directement par e-mail.');
        }
      },
    });
  }
}
