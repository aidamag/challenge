import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { SharedModule } from './shared/shared.module';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { RoomFilterComponent } from './components/room-filter/room-filter.component';
import { FilterRoomPipe } from './pipes/filterRoom.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    RoomFormComponent,
    RoomFilterComponent,
    FilterRoomPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
