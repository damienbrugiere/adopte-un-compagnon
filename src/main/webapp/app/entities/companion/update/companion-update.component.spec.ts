import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CompanionFormService } from './companion-form.service';
import { CompanionService } from '../service/companion.service';
import { ICompanion } from '../companion.model';

import { CompanionUpdateComponent } from './companion-update.component';

describe('Companion Management Update Component', () => {
  let comp: CompanionUpdateComponent;
  let fixture: ComponentFixture<CompanionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let companionFormService: CompanionFormService;
  let companionService: CompanionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CompanionUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CompanionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CompanionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    companionFormService = TestBed.inject(CompanionFormService);
    companionService = TestBed.inject(CompanionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const companion: ICompanion = { id: 456 };

      activatedRoute.data = of({ companion });
      comp.ngOnInit();

      expect(comp.companion).toEqual(companion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompanion>>();
      const companion = { id: 123 };
      jest.spyOn(companionFormService, 'getCompanion').mockReturnValue(companion);
      jest.spyOn(companionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ companion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: companion }));
      saveSubject.complete();

      // THEN
      expect(companionFormService.getCompanion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(companionService.update).toHaveBeenCalledWith(expect.objectContaining(companion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompanion>>();
      const companion = { id: 123 };
      jest.spyOn(companionFormService, 'getCompanion').mockReturnValue({ id: null });
      jest.spyOn(companionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ companion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: companion }));
      saveSubject.complete();

      // THEN
      expect(companionFormService.getCompanion).toHaveBeenCalled();
      expect(companionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompanion>>();
      const companion = { id: 123 };
      jest.spyOn(companionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ companion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(companionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
