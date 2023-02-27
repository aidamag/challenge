import { Component, EventEmitter, SimpleChanges } from '@angular/core';
import { Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss'],
})
export class CardContentComponent {
  @Input() max_capacity: any;
  @Input() occupation: any;

  @Output() onClick = new EventEmitter();
  form!: FormGroup;
  errorOccupation: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      update_capacity: 0,
      update_occupation: 0,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.max_capacity && this.occupation) {
      this.form = this.formBuilder.group({
        update_capacity: this.max_capacity,
        update_occupation: this.occupation,
      });
    }
  }

  onSubmit(): void {
    this.errorOccupation = '';
    if (this.validateOccupation()) {
      alert('Sala modificada!');
      this.onClick.emit(this.form.value);
    }
  }

  validateOccupation(): boolean {
    const room = this.form.value;
    if (room.update_occupation < 0 || room.update_occupation > 100) {
      this.errorOccupation = 'Valor entre 0 y 100';
      return false;
    }
    return true;
  }
}
