import { Component, Input } from '@angular/core';
import { PerformanceImageService } from '@modules/data/service/performance-image.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';
import { Performance } from '@modules/data/schema/performance';
import { OAuthService } from 'angular-oauth2-oidc';
import { plainToClass } from 'class-transformer';
import { User } from '@modules/data/schema/user';
import { PerformanceImage } from '@modules/data/schema/performance-image';
import { PerformanceImageCreateComponent } from '@modules/etree-db/component/performance-image-create/performance-image-create.component';

@Component({
  selector: 'app-performance-image-table',
  templateUrl: './performance-image-table.component.html',
  styleUrls: ['./performance-image-table.component.css']
})
export class PerformanceImageTableComponent extends AbstractHalLinkTable {
  public user: User;

  constructor(
    protected halService: PerformanceImageService,
    protected oauthService: OAuthService
  ) {
    super();

    this.user = plainToClass(User, this.oauthService.getIdentityClaims());
  }

  @Input()
  performance: Performance;

  @Input()
  hideUploadButton: boolean;

  getLinks(): void {
    return this.halResponse._embedded['performance_image'];
  }

  patch(performanceImage: PerformanceImage) {
    const newDescription = prompt('Enter a new description for the image', performanceImage.description);
    if (newDescription) {
      this.halService.patch(performanceImage, {description: newDescription}).subscribe(
        success => {
          this.loadLink();
        }
      );
    }
  }

  delete(performanceImage: PerformanceImage) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.halService.delete(performanceImage).subscribe(
        success => {
          this.loadLink();
        }
      );

    }
  }
}
