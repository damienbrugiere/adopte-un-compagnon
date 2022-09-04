import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICompanion } from '../companion.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../companion.test-samples';

import { CompanionService } from './companion.service';

const requireRestSample: ICompanion = {
  ...sampleWithRequiredData,
};

describe('Companion Service', () => {
  let service: CompanionService;
  let httpMock: HttpTestingController;
  let expectedResult: ICompanion | ICompanion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CompanionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Companion', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const companion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(companion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Companion', () => {
      const companion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(companion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Companion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Companion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Companion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCompanionToCollectionIfMissing', () => {
      it('should add a Companion to an empty array', () => {
        const companion: ICompanion = sampleWithRequiredData;
        expectedResult = service.addCompanionToCollectionIfMissing([], companion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(companion);
      });

      it('should not add a Companion to an array that contains it', () => {
        const companion: ICompanion = sampleWithRequiredData;
        const companionCollection: ICompanion[] = [
          {
            ...companion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCompanionToCollectionIfMissing(companionCollection, companion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Companion to an array that doesn't contain it", () => {
        const companion: ICompanion = sampleWithRequiredData;
        const companionCollection: ICompanion[] = [sampleWithPartialData];
        expectedResult = service.addCompanionToCollectionIfMissing(companionCollection, companion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(companion);
      });

      it('should add only unique Companion to an array', () => {
        const companionArray: ICompanion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const companionCollection: ICompanion[] = [sampleWithRequiredData];
        expectedResult = service.addCompanionToCollectionIfMissing(companionCollection, ...companionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const companion: ICompanion = sampleWithRequiredData;
        const companion2: ICompanion = sampleWithPartialData;
        expectedResult = service.addCompanionToCollectionIfMissing([], companion, companion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(companion);
        expect(expectedResult).toContain(companion2);
      });

      it('should accept null and undefined values', () => {
        const companion: ICompanion = sampleWithRequiredData;
        expectedResult = service.addCompanionToCollectionIfMissing([], null, companion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(companion);
      });

      it('should return initial array if no Companion is added', () => {
        const companionCollection: ICompanion[] = [sampleWithRequiredData];
        expectedResult = service.addCompanionToCollectionIfMissing(companionCollection, undefined, null);
        expect(expectedResult).toEqual(companionCollection);
      });
    });

    describe('compareCompanion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCompanion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCompanion(entity1, entity2);
        const compareResult2 = service.compareCompanion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCompanion(entity1, entity2);
        const compareResult2 = service.compareCompanion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCompanion(entity1, entity2);
        const compareResult2 = service.compareCompanion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
