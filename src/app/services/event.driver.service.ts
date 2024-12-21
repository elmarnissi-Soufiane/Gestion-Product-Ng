// gere le communication entre les composantes

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionEvent } from '../state/product.state';

@Injectable({ providedIn: 'root' })
export class EventDriverService {
  // pour faire le communication il faut creer un subject
  // Observerbale rxjs programmation reactive designe patter observer
  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  // creation de subject
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  // Methode publishe event pour recevoire l'evenement
  publishEvent(event: ActionEvent) {
    this.sourceEventSubject.next(event);
  }
}
