import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PerformanceService } from '../performance.service';
import { Performance } from '../performance';

@Component({
  selector: 'app-performance-detail',
  templateUrl: './performance-detail.component.html',
  styleUrls: ['./performance-detail.component.css']
})
export class PerformanceDetailComponent implements OnInit {
  private performanceId: number;
  private performance: Performance;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private performanceService: PerformanceService
) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.performanceId = +params['id']; // (+) converts string 'id' to a number

      this.performanceService.find(this.performanceId).subscribe(data => {
        this.performance = data;
      });
    });
  }
}
