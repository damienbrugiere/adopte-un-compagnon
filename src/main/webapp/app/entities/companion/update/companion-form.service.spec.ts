import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../companion.test-samples';

import { CompanionFormService } from './companion-form.service';

describe('Companion Form Service', () => {
  let service: CompanionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanionFormService);
  });

  describe('Service methods', () => {
    describe('createCompanionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCompanionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            photo: expect.any(Object),
          })
        );
      });

      it('passing ICompanion should create a new form with FormGroup', () => {
        const formGroup = service.createCompanionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            photo: expect.any(Object),
          })
        );
      });
    });

    describe('getCompanion', () => {
      it('should return NewCompanion for default Companion initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCompanionFormGroup(sampleWithNewData);

        const companion = service.getCompanion(formGroup) as any;

        expect(companion).toMatchObject(sampleWithNewData);
      });

      it('should return NewCompanion for empty Companion initial value', () => {
        const formGroup = service.createCompanionFormGroup();

        const companion = service.getCompanion(formGroup) as any;

        expect(companion).toMatchObject({});
      });

      it('should return ICompanion', () => {
        const formGroup = service.createCompanionFormGroup(sampleWithRequiredData);

        const companion = service.getCompanion(formGroup) as any;

        expect(companion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICompanion should not enable id FormControl', () => {
        const formGroup = service.createCompanionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCompanion should disable id FormControl', () => {
        const formGroup = service.createCompanionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
