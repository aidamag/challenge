import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SelectComponent } from './components/select/select.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CardTitleComponent } from './components/card/card-title/card-title.component';
import { CardContentComponent } from './components/card/card-content/card-content.component';

@NgModule({
  declarations: [
    TextInputComponent,
    SelectComponent,
    DialogComponent,
    CardComponent,
    CardTitleComponent,
    CardContentComponent,
    ButtonComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    SelectComponent,
    DialogComponent,
    CardComponent,
    CardTitleComponent,
    CardContentComponent,
    ButtonComponent,
  ],
})
export class SharedModule {}
