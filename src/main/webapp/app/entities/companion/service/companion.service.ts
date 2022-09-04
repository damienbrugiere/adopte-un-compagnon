import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICompanion, NewCompanion } from '../companion.model';

export type PartialUpdateCompanion = Partial<ICompanion> & Pick<ICompanion, 'id'>;

export type EntityResponseType = HttpResponse<ICompanion>;
export type EntityArrayResponseType = HttpResponse<ICompanion[]>;

@Injectable({ providedIn: 'root' })
export class CompanionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/companions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(companion: NewCompanion): Observable<EntityResponseType> {
    return this.http.post<ICompanion>(this.resourceUrl, companion, { observe: 'response' });
  }

  update(companion: ICompanion): Observable<EntityResponseType> {
    return this.http.put<ICompanion>(`${this.resourceUrl}/${this.getCompanionIdentifier(companion)}`, companion, { observe: 'response' });
  }

  partialUpdate(companion: PartialUpdateCompanion): Observable<EntityResponseType> {
    return this.http.patch<ICompanion>(`${this.resourceUrl}/${this.getCompanionIdentifier(companion)}`, companion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompanion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompanion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCompanionIdentifier(companion: Pick<ICompanion, 'id'>): number {
    return companion.id;
  }

  compareCompanion(o1: Pick<ICompanion, 'id'> | null, o2: Pick<ICompanion, 'id'> | null): boolean {
    return o1 && o2 ? this.getCompanionIdentifier(o1) === this.getCompanionIdentifier(o2) : o1 === o2;
  }

  addCompanionToCollectionIfMissing<Type extends Pick<ICompanion, 'id'>>(
    companionCollection: Type[],
    ...companionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const companions: Type[] = companionsToCheck.filter(isPresent);
    if (companions.length > 0) {
      const companionCollectionIdentifiers = companionCollection.map(companionItem => this.getCompanionIdentifier(companionItem)!);
      const companionsToAdd = companions.filter(companionItem => {
        const companionIdentifier = this.getCompanionIdentifier(companionItem);
        if (companionCollectionIdentifiers.includes(companionIdentifier)) {
          return false;
        }
        companionCollectionIdentifiers.push(companionIdentifier);
        return true;
      });
      return [...companionsToAdd, ...companionCollection];
    }
    return companionCollection;
  }
}
