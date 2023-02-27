import { Component, OnInit } from '@angular/core';
import { Floor } from 'src/app/models/floor.interface';
import { SelectOption } from 'src/app/models/selectOption.interface';
import { FloorService } from 'src/app/services/floor.service';
import { Room } from 'src/app/models/room.interface';
import { Filter } from 'src/app/models/filter.interface';

@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  allFloors: Floor[] = [];
  floors: SelectOption[] = [];

  floorSelected: Floor = {
    floor: 0,
    rooms: [],
  };

  isDialogOpen: boolean = false;
  isFilterOpen: boolean = false;
  filters: Filter = {
    min_capacity: null,
    max_capacity: null,
    min_occupation: null,
    max_occupation: null,
  };

  constructor(private service: FloorService) {
    this.service.floors.subscribe((floors) => {
      if (floors.length > 0) {
        this.allFloors = floors;
        this.floors = [];
        floors.forEach((floor: Floor) => {
          const f: SelectOption = {
            label: `Planta ${floor.floor}`,
            value: floor.floor,
          };
          this.floors.push(f);
        });
        this.onClickOption(this.floors[0].value.toString());
      }
    });
  }

  ngOnInit(): void {}

  onClickOption(floor: string): void {
    const selected = this.setSelectedFloor(parseInt(floor));
    if (selected) {
      this.floorSelected = selected;
    }
  }

  setSelectedFloor(selected: number): Floor | undefined {
    return this.allFloors.find((el) => el?.floor === selected);
  }

  handleDialog(event: any): void {
    this.isDialogOpen = !this.isDialogOpen;
  }

  handleFilterDialog($event: any): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  updateRoom(room: number, event: any): void {
    const r: Room = {
      room: room,
      max_capacity: parseInt(event.update_capacity),
      occupation: parseInt(event.update_occupation),
    };
    this.service.updateRoom(this.floorSelected.floor, r);
  }

  saveRoom(event: any): void {
    const room: Room = {
      room: parseInt(event.room),
      max_capacity: parseInt(event.max_capacity),
      occupation: parseInt(event.occupation),
    };
    this.service.addRoom(this.floorSelected.floor, room);
  }

  deleteRoom(room: number): void {
    this.service.deleteRoom(this.floorSelected.floor, room);
  }

  filterRoom(event: any): void {
    const f: Filter = {
      min_capacity: event.min_capacity,
      max_capacity: event.max_capacity,
      min_occupation: event.min_occupation,
      max_occupation: event.max_occupation,
    };
    this.filters = f;
  }
}
