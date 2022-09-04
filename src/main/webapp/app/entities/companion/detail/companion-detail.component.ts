import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanion } from '../companion.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-companion-detail',
  templateUrl: './companion-detail.component.html',
})
export class CompanionDetailComponent implements OnInit {
  companion: ICompanion | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ companion }) => {
      this.companion = companion;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
