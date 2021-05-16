import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [HeaderComponent, PaginationComponent],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports: [HeaderComponent, PaginationComponent]
})

export class ComponentsModule { }
