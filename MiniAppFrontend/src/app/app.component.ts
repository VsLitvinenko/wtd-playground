import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IonApp } from '@ionic/angular/standalone';
import { TelegramService, ThemeService } from './core/services';
import { Subject, takeUntil } from 'rxjs';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  checkmarkOutline,
  timeOutline,
  helpOutline,
  removeOutline,
  closeOutline,
  refreshOutline,
  calendarOutline,
  listOutline,
  calendarClearOutline,
  clipboardOutline,
  arrowRedoOutline,
  linkOutline,
  cloudDoneOutline,
  ellipsisVertical,
  shareSocialOutline,
  createOutline,
  arrowForward,
  alertCircleOutline,
  trashOutline,
  addOutline,
} from 'ionicons/icons';
import { VoteCalendarComponent } from './features/vote-calendar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, VoteCalendarComponent],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly tg = inject(TelegramService);
  private readonly theme = inject(ThemeService);
  private readonly destroyed$ = new Subject<void>();

  constructor() {
    addIcons({
      chevronForwardOutline,
      checkmarkOutline,
      timeOutline,
      helpOutline,
      removeOutline,
      closeOutline,
      refreshOutline,
      calendarOutline,
      listOutline,
      calendarClearOutline,
      clipboardOutline,
      arrowRedoOutline,
      linkOutline,
      cloudDoneOutline,
      ellipsisVertical,
      shareSocialOutline,
      createOutline,
      arrowForward,
      alertCircleOutline,
      trashOutline,
      addOutline,
    });
  }

  ngOnInit(): void {
    this.tg.colorScheme$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cs) => this.theme.changeColorScheme(cs));
  }

  ngAfterViewInit(): void {
    this.logAllEvents();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(void 0);
    this.destroyed$.complete();
  }

  private logAllEvents(): void {
    Object.keys(window).forEach((key) => {
      if (/^on/.test(key)) {
        window.addEventListener(key.slice(2), (event) => {
          console.log(event.type, event);
        });
      }
    });
  }
}
