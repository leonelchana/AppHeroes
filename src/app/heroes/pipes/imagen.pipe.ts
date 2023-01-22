

import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  /* pure: true */
})

export class ImagenPipe implements PipeTransform {
    
  transform(heroe:Heroe): string {
    console.log('PIpe imagen se proceso');
    if (!heroe.id && !heroe.alt_img) {
      return '../assets/no-image.png';
    }else if(heroe.alt_img){
      return heroe.alt_img;
    }else{
      return `../assets/heroes/${heroe.id}.jpg`;
     /*  return 'https://tntsports.com.ar/img/2019/10/02/71db0a0046c11afea69a1767fc99021148719cd2.jpg'
 */
    }
    
/*     return `../assets/heroes/${heroe.id}.jpg`;
 */  }

}
