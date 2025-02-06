import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modality-item',
  imports: [CommonModule, IonicModule],
  templateUrl: './modality-item.component.html',
  styleUrls: ['./modality-item.component.scss'],
})
export class ModalityItemComponent {
  @Input() imageUrl!: string;
  @Input() modality!: string;
  @Input() cardType: 'action' | 'title-only' | 'title-subtitle' = 'title-only';

  constructor() {}

  get isCardWithAction(): boolean {
    return this.cardType === 'action';
  }

  get isCardWithTitleAndSubtitle(): boolean {
    return this.cardType === 'title-subtitle';
  }
}
