import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() datos;
  @Input() paginaActual = 1;
  @Input() total;
  @Output() actualizarPagina = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('paginaActual: ', this.paginaActual, 'total: ', this.total);
    
  }

  ngOnChanges(changes) {
    if (changes.paginaActual) this.paginaActual = changes.paginaActual.currentValue;
    if (changes.total) this.total = changes.total.currentValue;

    console.log('paginaActual: ', this.paginaActual, 'total: ', this.total);
  }

  actualizar(pagina) {
    console.log('event change: ', pagina);
    this.actualizarPagina.emit(pagina);
  }
}
