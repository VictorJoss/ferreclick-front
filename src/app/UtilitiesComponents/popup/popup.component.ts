import { Component } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  showPopup = false; // Controla la visibilidad del popup
  popupMessage = ''; // Mensaje que se mostrará

  showTimedPopup(message: string): void {
    this.popupMessage = message;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
