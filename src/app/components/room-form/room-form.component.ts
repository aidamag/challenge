import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Room } from 'src/app/models/room.interface';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
})
export class RoomFormComponent implements OnInit {
  @Input() floor: number = 0;
  @Input() isDialogOpen: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSave: EventEmitter<Room> = new EventEmitter<Room>();

  roomForm!: FormGroup;
  errorRoom: string = '';
  errorOccupation: string = '';
  errorCapacity: string = '';

  constructor(private formBuilder: FormBuilder, private service: FloorService) {
    this.roomForm = this.formBuilder.group({
      new_room: null,
      new_max_capacity: null,
      new_occupation: null,
    });
  }

  ngOnInit(): void {}

  closeHandle($event: any): void {
    this.onClose.emit();
    this.clearErrors();
  }

  saveRoom(): void {
    const values = this.validateValues();
    const exist = this.validateRoom();
    const range = this.validateOccupation();
    if (values && exist && range) {
      const room: Room = {
        room: this.roomForm.value.new_room,
        max_capacity: this.roomForm.value.new_max_capacity,
        occupation: this.roomForm.value.new_occupation,
      };
      this.onSave.emit(room);
      this.onClose.emit();
      this.clearErrors();
      this.resetForm();
    }
  }

  private validateRoom(): boolean {
    const room = this.roomForm.value;
    const existRoom = this.service.existsRoom(
      this.floor,
      parseInt(room.new_room)
    );
    if (existRoom) {
      this.errorRoom = 'La sala ya existe';
      return false;
    }
    return true;
  }

  private validateOccupation(): boolean {
    const room = this.roomForm.value;
    if (room.new_occupation < 0 || room.new_occupation > 100) {
      this.errorOccupation = 'Valor entre 0 y 100';
      return false;
    }
    return true;
  }

  private validateValues(): boolean {
    const room = this.roomForm.value;
    const message = 'Valor requerido';
    if (!room.new_room) this.errorRoom = message;
    if (!room.new_max_capacity) this.errorCapacity = message;
    if (!room.new_occupation) this.errorOccupation = message;
    if (!room.new_room || !room.new_max_capacity || !room.new_occupation)
      return false;
    return true;
  }

  private clearErrors(): void {
    this.errorRoom = '';
    this.errorCapacity = '';
    this.errorOccupation = '';
  }

  private resetForm(): void {
    this.roomForm.reset();
  }
}
