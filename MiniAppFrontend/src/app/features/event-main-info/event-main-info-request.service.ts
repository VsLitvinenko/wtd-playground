import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  constructor() { }

  public getEventInfo(eventId: string): Observable<EventInfo> {
    return of({
      id: '',
      name: '',
      starts: new Date(),
      ends: new Date(),
      creator: {
        fullName: '',
        photoUrl: '',
      },
      canEdit: false,
    });
    // return this.http.get<EventInfo>(`${this.baseUrl}/info/${eventId}`);
  }

  public getEventUsers(eventId: string): Observable<EventUser[]> {
    return of([]);
    // return this.http.get<UserItem[]>(`${this.baseUrl}/users/${eventId}`);
  }

  public deleteEvent(eventId: string): Observable<unknown> {
    return of(null);
    // return this.http.delete(`${this.baseUrl}/${eventId}`);
  }
}
