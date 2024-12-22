import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatsComponent } from '../../pages/stats/stats.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, StatsComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {}
