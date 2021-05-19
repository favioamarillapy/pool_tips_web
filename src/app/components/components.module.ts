import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [HeaderComponent, PaginationComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [HeaderComponent, PaginationComponent]
})

export class ComponentsModule { }
