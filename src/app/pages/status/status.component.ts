import { Component, OnInit } from '@angular/core';
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


  constructor(
    private poolService: PoolService,
    private ngxService: NgxUiLoaderService

  ) {
    this.ngxService.start();

    this.getDayData();
    this.getWeekData();
    this.getMonthData();

    this.loading = false;
    this.ngxService.stop();
  }

  ngOnInit(): void {
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

  getMonthData() {
    this.monthChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011'];
    this.monthChartData.push({ data: [65, 59, 80, 81, 56, 55, 40], label: 'PH' });
    this.monthChartData.push({ data: [65, 59, 80, 81, 56, 55, 40], label: 'Temperatura' });
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
      position: 'left',
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
        align: align,
        font: {
          weight: 'bold'
        },
        formatter: Math.round
      }
    };
  }

 

}