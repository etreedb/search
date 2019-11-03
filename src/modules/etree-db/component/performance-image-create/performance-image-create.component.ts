import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceService } from '@modules/data/service/performance.service';
import { Performance } from '@modules/data/schema/performance';
import { PerformanceImageService } from '@modules/data/service/performance-image.service';
import { HttpErrorResponse } from '@angular/common/http';

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
public validation_messages: any;

constructor(
  private performanceImageService: PerformanceImageService,
  private performanceService: PerformanceService,
  private route: ActivatedRoute,
  private router: Router,
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
    this.validation_messages = null;
    formData.append('image', this.fileData);
    formData.append('performance', String(this.performance.id));
    formData.append('description', this.description || 'no description');

    this.performanceImageService.uploadFile(formData)
      .subscribe(
        success => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 422:
              this.validation_messages = error.error.validation_messages;
              break;
            default:
              alert('There was an error uploading your image.');
              console.log(error);
          }
        }
    );
  }
}
