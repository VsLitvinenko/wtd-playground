import { inject, Injectable } from '@angular/core';
import { TelegramService } from 'src/app/core/services';
import { first, map, Observable, shareReplay, startWith } from 'rxjs';
import { Localization, LocalizationPresetLeaf, LocalizationSet } from './localize.model';
import { inRange } from 'lodash';
import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root'
})
export class LocalizeService {
  // private readonly browserLocalization = 'en';
  private readonly browserLocalization = navigator.language.split('-')[0];
  private readonly tg = inject(TelegramService);

  public readonly localization$ = this.tg.languageCode$.pipe(
    map((local) => LocalizationSet.has(local) ? (local as Localization) : Localization.en),
    startWith((this.browserLocalization as Localization) ?? Localization.en),
    shareReplay(1)
  );

  public readonly localizationSignal = toSignal(
    this.localization$,
    { initialValue: Localization.en }
  );

  public readonly localizationWithFormat$ = this.localization$.pipe(
    map((local) => `${local.toLowerCase()}-${local.toUpperCase()}`),
    shareReplay(1)
  );

  public readonly localizeLongDateFormat$ = this.localization$.pipe(
    map((localize) => {
      let dateFormat: string;
      switch (localize) {
        case Localization.en:
          dateFormat = 'MMMM d, yyyy';
          break;
        case Localization.ru:
          dateFormat = 'd MMMM, yyyy';
          break;
        default:
          dateFormat = 'MMMM d, yyyy';
          break;
      }
      return { localize, dateFormat };
    }),
    shareReplay(1),
  );

  public localize(value: LocalizationPresetLeaf, onlyFirst?: boolean): Observable<string> {
    const res$ = this.localization$.pipe(map((loc) => value[loc] ?? value.en));
    return onlyFirst ? res$.pipe(first()) : res$;
  }

  public localizeSync(value: LocalizationPresetLeaf): string {
    return value[this.localizationSignal()] ?? value.en;
  }

  public localizeMany(value: LocalizationPresetLeaf, n: number, onlyFirst?: boolean): Observable<string> {
    const res$ = this.localization$.pipe(map((loc) => value[loc] + this.getMany(loc, n)));
    return onlyFirst ? res$.pipe(first()) : res$;
  }

  private getMany(loc: Localization, n: number): string {
    switch (loc) {
      case Localization.en:
        return n === 1 ? '' : 's';
      case Localization.ru:
        if (n === 1) {
          return '';
        } else if (inRange(n, 1, 5)) {
          return 'а';
        } else {
          return 'ов';
        }
      default:
        return '';
    }
  }
}
