import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  HostListener,
  ElementRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectOption } from 'src/app/models/selectOption.interface';

@Component({
  selector: 'select-custom',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() value: SelectOption[] = [];
  @Input() labelOption: number[] = [];
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

  wasInside: boolean = false;
  selectedOption: SelectOption = {
    label: '',
    value: -1,
  };
  openMenu: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.ref.nativeElement.contains(event.target)) {
      if (this.openMenu) {
        this.openMenu = false;
      }
    }
  }

  constructor(private ref: ElementRef) {}

  defaultInputs = new BehaviorSubject<any>({
    value: [],
    labelOption: [],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.value[0]) {
      this.selectedOption = this.value[0];
    }
  }

  ngOnInit(): void {}

  handleMenu() {
    this.openMenu = !this.openMenu;
  }

  selectOption(event: any) {
    const option = this.value.find(
      (el) => el?.value === parseInt(event.target.value)
    );
    if (option) this.selectedOption = option;
    this.handleMenu();
    this.onClick.emit(event.target.value);
  }
}
