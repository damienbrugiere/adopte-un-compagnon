import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICompanion, NewCompanion } from '../companion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICompanion for edit and NewCompanionFormGroupInput for create.
 */
type CompanionFormGroupInput = ICompanion | PartialWithRequiredKeyOf<NewCompanion>;

type CompanionFormDefaults = Pick<NewCompanion, 'id'>;

type CompanionFormGroupContent = {
  id: FormControl<ICompanion['id'] | NewCompanion['id']>;
  name: FormControl<ICompanion['name']>;
  photo: FormControl<ICompanion['photo']>;
  photoContentType: FormControl<ICompanion['photoContentType']>;
};

export type CompanionFormGroup = FormGroup<CompanionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CompanionFormService {
  createCompanionFormGroup(companion: CompanionFormGroupInput = { id: null }): CompanionFormGroup {
    const companionRawValue = {
      ...this.getFormDefaults(),
      ...companion,
    };
    return new FormGroup<CompanionFormGroupContent>({
      id: new FormControl(
        { value: companionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(companionRawValue.name, {
        validators: [Validators.required],
      }),
      photo: new FormControl(companionRawValue.photo, {
        validators: [Validators.required],
      }),
      photoContentType: new FormControl(companionRawValue.photoContentType),
    });
  }

  getCompanion(form: CompanionFormGroup): ICompanion | NewCompanion {
    return form.getRawValue() as ICompanion | NewCompanion;
  }

  resetForm(form: CompanionFormGroup, companion: CompanionFormGroupInput): void {
    const companionRawValue = { ...this.getFormDefaults(), ...companion };
    form.reset(
      {
        ...companionRawValue,
        id: { value: companionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CompanionFormDefaults {
    return {
      id: null,
    };
  }
}
