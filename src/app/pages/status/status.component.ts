import { Component, HostListener, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { PoolService } from 'src/app/services/pool.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  public chartPlugins = [pluginDataLabels];
  public chartLegend = true;

  public dayChartOptions: ChartOptions = this.getChartOptions('Datos del Dia', 'center');
  public dayChartLabels: Label[] = [];
  public dayChartData: SingleDataSet = [];
  public dayChartType: ChartType = 'doughnut';

  public weekChartOptions: ChartOptions = this.getChartOptions('Datos de la semana', 'end');
  public weekChartLabels: Label[] = [];
  public weekChartData: ChartDataSets[] = [];
  public weekChartType: ChartType = 'bar';
  public weekChartLegend = true;
  public weekChartPlugins = [];

  public monthChartOptions: ChartOptions = this.getChartOptions('Datos del mes', 'end');
  public monthChartLabels: Label[] = [];
  public monthChartData: ChartDataSets[] = [];
  public monthChartType: ChartType = 'bar';

  public loading = true;
  public isMobile = true;

  constructor(
    private poolService: PoolService,
    private ngxService: NgxUiLoaderService
  ) { }

  async ngOnInit() {
    this.ngxService.start();

    await this.getDayData();
    await this.getWeekData();
    await this.getMonthData();

    this.loading = await false;
    this.ngxService.stop();
  }

  async getDayData() {
    let response: any = await this.poolService.graphic('day');

    if (response.data) {
      this.dayChartLabels = response.data.labels;
      this.dayChartData = response.data.values;
    }
  }

  async getWeekData() {
    let response: any = await this.poolService.graphic('week');

    if (response.data) {
      this.weekChartLabels = response.data.labels;
      this.weekChartData = response.data.values;
    }
  }

  async getMonthData() {
    let response: any = await this.poolService.graphic('month');

    if (response.data) {
      this.monthChartLabels = response.data.labels;
      this.monthChartData = response.data.values;
    }
  }

  getChartOptions(title: string, align: string): ChartOptions {
    return {
      responsive: true,
      title: this.getTitle(title),
      plugins: this.getPluginLabel(align)
    }
  }

  getTitle(title: string): any {
    return {
      display: true,
      position: 'top',
      fullWidth: true,
      fontSize: 20,
      padding: 10,
      text: title
    };
  }

  getPluginLabel(align: string): any {
    return {
      datalabels: {
        display: true,
        inside: true,
        align: align,
        clamp: true,
        font: {
          weight: 'bold'
        },
        formatter: function (value, context) {
          return Math.round(value * 100) / 100;
        }
      }
    };
  }



}
