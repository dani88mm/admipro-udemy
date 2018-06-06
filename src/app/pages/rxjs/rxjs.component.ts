import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/internal/Subscriber';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    this.regresaObservable()
    .subscribe(
      numero =>  console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino')
    );
   }

  ngOnInit() {
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;

      const intervalo = setInterval( () => {
        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        if ( contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    }).pipe(
      map( resp =>  resp.valor),
      filter( (valor, index) => {
        if ( (valor % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
