import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResultInfo } from './models';

@Injectable({
  providedIn: 'root'
})
export class ResultViewRequestService {
  private readonly baseUrl = 'results';

  constructor() { }

  public getEventResults(eventId: string): Observable<ResultInfo> {
    return of({
      eventId: '',
      maxOverlap: 1,
      dates: [],
    });
    // const params = { eventId };
    // return this.http.get<ResultInfo>(this.baseUrl, { params }).pipe(
    //   map((info) => {
    //     const dates = info.dates.map((d) => VoteDateConverter.toJsDates(d));
    //     return { ...info, dates };
    //   })
    // );
  }
}
