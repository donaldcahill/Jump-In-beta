import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutUsePageRoutingModule } from './about-use-routing.module';

import { AboutUsePage } from './about-use.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutUsePageRoutingModule
  ],
  declarations: [AboutUsePage]
})
export class AboutUsePageModule {}
