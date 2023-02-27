import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Floor } from '../models/floor.interface';
import { Room } from '../models/room.interface';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  private apiUrl = 'https://apimocha.com/challenge-rooms/rooms';
  private floorsSubject: BehaviorSubject<Floor[]> = new BehaviorSubject<
    Floor[]
  >([]);
  private floorsData: Floor[] = [];

  constructor(private http: HttpClient) {
    this.getAllFloors();
  }

  //Get all data from API
  getAllFloors(): void {
    this.http.get<Floor[]>(this.apiUrl).subscribe((response) => {
      this.setFloor(response);
      this.floorsData = response;
    });
  }

  //Get data as observable
  get floors(): Observable<Floor[]> {
    return this.floorsSubject.asObservable();
  }

  //Set new data to the actual data
  public setFloor(floors: Floor[]): void {
    this.floorsSubject.next(floors);
  }

  //Update a room from given floor
  updateRoom(floor: number, room: Room): void {
    const indexFloor = this.floorsData.findIndex((obj) => obj.floor === floor);
    if (indexFloor >= 0) {
      const indexRoom = this.floorsData[indexFloor].rooms.findIndex(
        (obj) => obj.room === room.room
      );
      if (indexRoom >= 0) {
        this.floorsData[indexFloor].rooms[indexRoom] = room;
        this.setFloor(this.floorsData);
      }
    }
  }

  //Add a room to given floor
  addRoom(floor: number, room: Room): void {
    const index = this.floorsData.findIndex((obj) => obj.floor === floor);
    if (index >= 0) {
      this.floorsData[index].rooms.push(room);
      this.setFloor(this.floorsData);
    }
  }

  //Delete a room from given floor
  deleteRoom(floor: number, room: number): void {
    const indexFloor = this.floorsData.findIndex((obj) => obj.floor === floor);
    if (indexFloor >= 0) {
      const indexRoom = this.floorsData[indexFloor].rooms.findIndex(
        (obj) => obj.room === room
      );
      indexRoom >= 0 && this.floorsData[indexFloor].rooms.splice(indexRoom, 1);
      this.setFloor(this.floorsData);
    }
  }

  //Check if a room already exists in given floor
  existsRoom(floor: number, room: number): boolean {
    const f = this.floorsData.find((obj) => obj.floor === floor);
    if (f) {
      const r = f.rooms?.find((obj) => obj.room === room);
      if (r !== undefined) return true;
    }
    return false;
  }
}
