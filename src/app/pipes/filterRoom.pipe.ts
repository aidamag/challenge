import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from '../models/filter.interface';
import { Room } from '../models/room.interface';

@Pipe({
  name: 'filterRoom',
  pure: false,
})
export class FilterRoomPipe implements PipeTransform {
  transform(value: any[], filters: Filter): any[] {
    if (!this.allValuesNull(filters)) {
      value = this.filterArray(value, filters);
    }
    return value;
  }

  private filterArray(rooms: Room[], filters: Filter): Room[] {
    return rooms.filter((room) => {
      const checkMinCapacity = this.checkMinValues(
        room.max_capacity,
        filters.min_capacity
      );
      const checkMinOccupation = this.checkMinValues(
        room.occupation,
        filters.min_occupation
      );
      const checkMaxCapacity = this.checkMaxValues(
        room.max_capacity,
        filters.max_capacity
      );
      const checkMaxOccupation = this.checkMaxValues(
        room.occupation,
        filters.max_occupation
      );
      return (
        checkMinCapacity &&
        checkMinOccupation &&
        checkMaxCapacity &&
        checkMaxOccupation
      );
    });
  }

  private allValuesNull(filters: Filter): boolean {
    return (
      filters.max_capacity === null &&
      filters.min_capacity === null &&
      filters.min_occupation === null &&
      filters.max_occupation === null
    );
  }

  private checkMinValues(value: number, min: number | null) {
    if (min) {
      return value >= min;
    }
    return true;
  }

  private checkMaxValues(value: number, max: number | null) {
    if (max) {
      return value <= max;
    }
    return true;
  }
}
