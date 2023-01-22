import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

/*  import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
 */
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width:100%;
    border-radius:10px;

  }
  `],
})
export class AgregarComponent implements OnInit {
  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
      return;
    }
 this.activatedRoute.params
    .pipe(switchMap(({ id }) => this.heroesService.getheroePorId(id)))
    .subscribe((heroe) => (this.heroe = heroe)); 
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
     private router: Router ,
     private _snackBar: MatSnackBar,
     public dialog: MatDialog 
  ) 
    {}
  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((heroe) => this.mostrarSnakbar('Registro actualizado'));
    } else {
      this.heroesService.agregarHeroe(this.heroe)
          .subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
         this.mostrarSnakbar('Registro creado'); 
      });
    } 
  }

  borrarHeroe() {
 
   const dialog= this.dialog.open(ConfirmarComponent,{
      width:'400px',
      data:{...this.heroe}
  
  });
  dialog.afterClosed()
  .subscribe((resul)=>
    {
      if(resul){
        this.heroesService.borrarHeroe(this.heroe.id!)
      .subscribe(resp=>{
        this.router.navigate(['/heroes']);
      })
      }
    })
    /*    
  */ }

  mostrarSnakbar(mensaje: string) {
     
     this._snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });  
  }
}
