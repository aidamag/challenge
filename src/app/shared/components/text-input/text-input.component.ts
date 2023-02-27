import { Component, Input, OnInit, Self, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() iconSrc: string = '';
  @Input() error: string = '';
  @Input() type: string = 'string';
  @Input() placeholder: string = '';

  renderedValue: string = '';
  icon: boolean = false;

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    if (this.iconSrc) this.icon = true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.renderedValue = this.value || '';
  }

  onChange: (value: any) => void = () => {};

  onTouched: () => void = () => {};

  writeValue(value: any): void {
    value && this.controlDir.control?.setValue(value, { emitEvent: false });
  }

  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {}

  setDisabledState(disabled: boolean): void {}
}
