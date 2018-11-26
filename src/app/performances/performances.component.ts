import { Component, OnInit } from '@angular/core';
import { Performance } from '../performance';
import { PerformanceService } from '../performance.service';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css']
})
export class PerformancesComponent implements OnInit {

  performances: Performance[];

  constructor(
    private performanceService: PerformanceService,
  ) {
    }

  ngOnInit() {}
}
