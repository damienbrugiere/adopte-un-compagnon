import { ICompanion, NewCompanion } from './companion.model';

export const sampleWithRequiredData: ICompanion = {
  id: 14662,
  name: 'Manat Fiji Analyste',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
};

export const sampleWithPartialData: ICompanion = {
  id: 37498,
  name: 'input visualize',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
};

export const sampleWithFullData: ICompanion = {
  id: 20781,
  name: 'utilize Agent',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
};

export const sampleWithNewData: NewCompanion = {
  name: 'Towels XSS',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
