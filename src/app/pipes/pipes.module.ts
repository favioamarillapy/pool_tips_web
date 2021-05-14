import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { ImageUrlPipe } from './image-url.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    ImageUrlPipe
  ],
  exports: [
    ImagePipe,
    ImageUrlPipe
  ],
  imports: [
    CommonModule
  ]
})

export class PipesModule { }