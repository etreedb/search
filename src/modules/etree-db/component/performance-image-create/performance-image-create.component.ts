import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from '@env';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceService } from '@modules/data/service/performance.service';
import { Performance } from '@modules/data/schema/performance';
import { PerformanceImageService } from '@modules/data/service/performance-image.service';

@Component({
  selector: 'app-performance-image-create',
  templateUrl: './performance-image-create.component.html',
  styleUrls: ['./performance-image-create.component.css']
})
export class PerformanceImageCreateComponent {
public fileData: File = null;
public previewUrl: any = null;
public fileUploadProgress: string = null;
public uploadedFilePath: string = null;
public performanceImageForm: FormGroup;
public performance: Performance;
public description: string;

constructor(
  private performanceImageService: PerformanceImageService,
  private performanceService: PerformanceService,
  private route: ActivatedRoute,
  private router: Router
) {
    this.performanceImageForm = new FormGroup({
      description: new FormControl(''),
      image: new FormControl(''),
    });

    this.route.queryParams.subscribe(queryParams => {
      this.performanceService.find(queryParams['performance_id'])
        .subscribe(performance => this.performance = performance);
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
}

  onSubmit() {
    const formData = new FormData();
      formData.append('image', this.fileData);
      formData.append('performance', String(this.performance.id));
      formData.append('description', this.description);

      this.performanceImageService.uploadFile(formData)
        .subscribe(result => {
          this.router.navigate(['/db/performance', this.performance.id])
        });
  }
}
