import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
