import { computed, Directive, inject, input } from '@angular/core';
import { VoteType } from '../vote-calendar/models';
import { format, startOfDay } from 'date-fns';
import { ResultDate } from './models';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { finalize, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { ResultViewRequestService } from './result-view-request.service';
import { FeatureLoadDirective } from 'src/app/shared/directives';


const today = startOfDay(new Date());

@Directive({
  selector: '[appResultView]',
  exportAs: 'appResultView',
})
export class ResultViewDirective {
  public readonly eventId = input.required<string>();
  // filters
  public readonly min = input.required<number>();
  public readonly noMaybe = input.required<boolean>();
  public readonly noTime = input.required<boolean>();
  public readonly onlyWithMe = input.required<boolean>();
  public readonly trimPast = input.required<boolean>();

  private readonly request = inject(ResultViewRequestService);
  private readonly featureLoad = inject(FeatureLoadDirective, { optional: true });

  private readonly refresh$ = new Subject<boolean>();
  private readonly eventid$ = toObservable(this.eventId);
  
  private readonly info$ = this.refresh$.pipe(
    startWith(true),
    switchMap(() => this.eventid$),
    tap(() => this.featureLoad?.incrLoading()),
    switchMap((eventId) =>
      this.request.getEventResults(eventId)
        .pipe(finalize(() => this.featureLoad?.decrLoading()))
    ),
    shareReplay(1)
  );

  public readonly info = toSignal(this.info$);
  private readonly dates = computed(() => this.info()?.dates ?? []);

  public readonly filteredDates = computed(() => {
    return this.dates().filter((date) =>
      date.users.length >= this.min()
      && (!this.trimPast() || date.date >= today)
      && (!this.noMaybe() || date.voteType !== VoteType.Maybe)
      && (!this.noTime() || date.voteType !== VoteType.Time)
      && (!this.onlyWithMe() || date.isWithMe)
    );
  });

  private readonly filteredDatesMap = computed(() => {
    const filteredDates = this.filteredDates();
    return new Map(filteredDates.map((i) => [this.formatVoteDate(i.date), i]));
  });
  
  constructor() { }

  public refresh(): void {
    this.refresh$.next(true);
  }

  public formatVoteDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }

  public getVoteDate(date: Date): ResultDate | undefined {
    const formatted = this.formatVoteDate(date);
    return this.filteredDatesMap().get(formatted);
  }
}