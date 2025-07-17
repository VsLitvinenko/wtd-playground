import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VoteDate } from './models';


export interface EventVote {
  alreadyVoted: boolean;
  dates: VoteDate[];
}

@Injectable({
  providedIn: 'root'
})
export class VoteCalendarRequestService {
  private readonly baseUrl = 'votes';

  constructor() { }

  public getEventVote(eventId: string): Observable<EventVote> {
    return of({
      alreadyVoted: false,
      dates: [],
    })
    // const params = { eventId };
    // return this.http.get<EventVote>(this.baseUrl, { params }).pipe(
    //   map((res) => {
    //     const dates = res.dates.map((date) => VoteDateConverter.toJsDates(date));
    //     return { ...res, dates };
    //   })
    // );
  }

  public updateEventVote(eventId: string, dates: VoteDate[]): Observable<EventVote> {
    return of({
      alreadyVoted: false,
      dates: [],
    })
    // const converted = dates.map((d) => VoteDateConverter.toStringDates(d));
    // const body = { dates: converted };
    // const params = { eventId };
    // return this.http.post<EventVote>(this.baseUrl, body, { params }).pipe(
    //   map((res) => {
    //     const dates = res.dates.map((date) => VoteDateConverter.toJsDates(date));
    //     return { ...res, dates };
    //   })
    // );
  }
}
