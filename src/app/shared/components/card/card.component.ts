import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  deleteCard() {
    if (confirm('¿Estas seguro de eliminar la sala?')) {
      this.onDelete.emit();
    }
  }
}
