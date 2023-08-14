import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatternFakerService } from '../services/pattern-faker.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { SystemService } from '../services/system.service';

@Component({
  selector: 'app-patterns-home',
  standalone: true,
  templateUrl: './patterns-home.component.html',
  styleUrls: ['./patterns-home.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
  ],
  providers: [
    PatternFakerService,
    SystemService,
  ]
})
export class PatternsHomeComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private faker = inject(PatternFakerService);

  newSystem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  viewSystems() {
    this.router.navigate(['view'], { relativeTo: this.route });
  }

}
