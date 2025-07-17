import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { IonAvatar } from '@ionic/angular/standalone';
import { UserItem } from '../users-list/users-list.component';
import { ImgLoadDirective } from '../../directives';

@Component({
  selector: 'app-avatars-list',
  templateUrl: './avatars-list.component.html',
  styleUrls: ['./avatars-list.component.scss'],
  imports: [
    CommonModule,
    IonAvatar,
    ImgLoadDirective,
  ],
})
export class AvatarsListComponent {
  public readonly users = input.required<UserItem[]>();
  public readonly maxCount = input(8);

  public readonly sliced = computed(() => this.users().slice(0, this.maxCount()));
}
