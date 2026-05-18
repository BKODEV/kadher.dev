import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, IconComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly fb = new FormBuilder().nonNullable;

  readonly subjects = [
    'Demande de projet',
    'Internalisation IT / Infrastructure',
    'Conseil / Accompagnement',
    'Juste pour dire bonjour',
  ] as const;

  readonly sent = signal(false);
  readonly submitting = signal(false);

  readonly form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    org: [''],
    kind: ['Demande de projet'],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  errorFor(control: 'name' | 'email' | 'message'): string | null {
    const c = this.form.controls[control];
    if (!c.touched || c.valid) return null;
    if (c.hasError('required')) return 'Requis';
    if (c.hasError('email')) return 'E-mail invalide';
    if (c.hasError('minlength')) return 'Quelques mots de plus (10+ caractères)';
    return null;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.sent.set(true);
    }, 800);
  }
}
