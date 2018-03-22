import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './graficoDona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() leyenda: string = '';
  @Input() ChartLabels: string[] = [];
  @Input() ChartData: number[] = [];
  @Input() ChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
