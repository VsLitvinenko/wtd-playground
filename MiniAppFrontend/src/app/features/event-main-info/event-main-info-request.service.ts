import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserItem } from 'src/app/shared/components';


export interface EventInfo {
  id: string;
  name: string;
  starts: Date;
  ends: Date;
  description?: string;
  creator: UserItem;
  canEdit: boolean;
}

export type EventUser = UserItem & { username?: string }

@Injectable({
  providedIn: 'root'
})
export class EventMainInfoRequestService {
  private readonly baseUrl = 'events';
  private readonly http = inject(HttpClient);

  constructor() { }

  public getEventInfo(eventId: string): Observable<EventInfo> {
    return this.http.get<EventInfo>(`${this.baseUrl}/info/${eventId}`);
  }

  public getEventUsers(eventId: string): Observable<EventUser[]> {
    return this.http.get<UserItem[]>(`${this.baseUrl}/users/${eventId}`);
  }

  public deleteEvent(eventId: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${eventId}`);
  }
}
