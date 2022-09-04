export interface ICompanion {
  id: number;
  name?: string | null;
  photo?: string | null;
  photoContentType?: string | null;
}

export type NewCompanion = Omit<ICompanion, 'id'> & { id: null };
