import { Component, OnInit } from '@angular/core';
import { EventDriverService } from '../../services/event.driver.service';
import { ActionEvent } from '../../state/product.state';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent implements OnInit {
  counter: number = 0;

  constructor(private eventDriverService: EventDriverService) {}

  ngOnInit(): void {
    // pour compter les ajoutes et modifications
    this.eventDriverService.sourceEventSubject.subscribe(
      (actionEvent: ActionEvent) => {
        ++this.counter;
      }
    );
  }
}
