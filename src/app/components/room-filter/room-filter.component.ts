import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Filter } from 'src/app/models/filter.interface';

@Component({
  selector: 'room-filter',
  templateUrl: './room-filter.component.html',
  styleUrls: ['./room-filter.component.scss'],
})
export class RoomFilterComponent implements OnInit {
  @Input() floor: number = 0;
  @Input() isFilterOpen: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onFilter: EventEmitter<{}> = new EventEmitter<{}>();

  filterForm!: FormGroup;
  errorMinOccupation: string = '';
  errorMaxOccupation: string = '';
  min_capacity_value: string = '';
  max_capacity_value: string = '';
  min_ocuppation_value: string = '';
  max_ocuppation_value: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      min_capacity: this.min_capacity_value,
      max_capacity: this.max_capacity_value,
      min_occupation: this.min_ocuppation_value,
      max_occupation: this.max_ocuppation_value,
    });
  }

  ngOnInit(): void {}

  closeHandle($event: any): void {
    this.clearErrors();
    this.onClose.emit();
  }

  filterHandle(): void {
    this.clearErrors();
    if (this.validateOccupation()) {
      this.onFilter.emit(this.getValidValues());
      this.onClose.emit();
    }
  }

  private getValidValues(): Filter {
    this.min_capacity_value = this.filterForm.value.min_capacity;
    this.max_capacity_value = this.filterForm.value.max_capacity;
    this.min_ocuppation_value = this.filterForm.value.min_occupation;
    this.max_ocuppation_value = this.filterForm.value.max_occupation;
    return {
      min_capacity: this.parseValue(this.min_capacity_value),
      max_capacity: this.parseValue(this.max_capacity_value),
      min_occupation: this.parseValue(this.min_ocuppation_value),
      max_occupation: this.parseValue(this.max_ocuppation_value),
    };
  }

  private validateOccupation(): boolean {
    const filter = this.filterForm.value;
    const error = 'Valor entre 0 y 100';
    let validate = true;
    if (!this.validateInputOccupation(filter.min_occupation)) {
      validate = false;
      this.errorMinOccupation = error;
    }
    if (!this.validateInputOccupation(filter.max_occupation)) {
      validate = false;
      this.errorMaxOccupation = error;
    }
    return validate;
  }

  private validateInputOccupation(value: number): boolean {
    if (value < 0 || value > 100) return false;
    return true;
  }

  private clearErrors(): void {
    this.errorMinOccupation = '';
    this.errorMaxOccupation = '';
  }

  private parseValue(value: string): number | null {
    return value ? parseInt(value) : null;
  }
}
