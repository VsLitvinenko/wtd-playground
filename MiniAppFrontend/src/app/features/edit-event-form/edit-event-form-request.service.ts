import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserItem } from 'src/app/shared/components';


export interface EventInfo {
  id: string;
  name: string;
  starts: string;
  ends: string;
  description?: string;
  creator: UserItem;
  canEdit: boolean;
}

export type EventBody = Omit<EventInfo, 'id' | 'users' | 'creator'>;

@Injectable({
  providedIn: 'root'
})
export class EdiEventFormRequestService {
  private readonly baseUrl = 'events';
  private readonly http = inject(HttpClient);

  constructor() { }

  public getEventInfo(eventId: string): Observable<EventInfo> {
    return this.http.get<EventInfo>(`${this.baseUrl}/info/${eventId}`);
  }

  public createEvent(body: EventBody): Observable<string> {
    return this.http.post<any>(this.baseUrl, body).pipe(
      map((res) => res.id)
    );
  }

  public updateEvent(eventId: string, body: EventBody): Observable<string> {
    return this.http.patch<any>(`${this.baseUrl}/${eventId}`, body).pipe(
      map((res) => res.id)
    );
  }
}
