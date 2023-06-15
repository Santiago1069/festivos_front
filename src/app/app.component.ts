import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from './services/app.service';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mostrarTabla: boolean = false;

  fechaSeleccionada: any = '';

  anioIngresado: any = '';

  fechaActual: Date = new Date();

  respuestaBack: any = '';

  festivos: any = [];

  constructor(private appService: AppService) { }


  ngOnInit(): void {
    this.getFestivos();
  }

  ocultar(){
    this.mostrarTabla = false
    this.anioIngresado = '';
  }

  getFecha() {

    if (this.fechaSeleccionada == '') {
      return
    }


    const datePipe = new DatePipe('en-US');
    const fechaFormateada = datePipe.transform(this.fechaSeleccionada, 'yyyy/MM/dd');

    const anioSeleccionado = fechaFormateada?.slice(0, 4);
    const mesSeleccionado = fechaFormateada?.slice(5, 7);
    const diaSeleccionado = fechaFormateada?.slice(8, 10);

    this.appService.fechaFestivos(anioSeleccionado, mesSeleccionado, diaSeleccionado).subscribe(
      res => {
        this.respuestaBack = res;
        console.log(res);

      },
      (event: HttpErrorResponse) => {
        this.respuestaBack = event.error.text
        console.log(event);
      }
    )
  }


  consultarAnio() {


    if (this.anioIngresado == '') {
      return
    }

    this.appService.consultarAnio(this.anioIngresado).subscribe(
      res => {
        this.mostrarTabla = true;
        this.festivos = res;
      },
      err => {
        console.log(err)
      }
    )




  }

  getFestivos() {
    this.appService.getFestivos().subscribe(
      res => {
        this.festivos = res;
      },
      err => {
        console.log(err)
      }
    )
  }

}
