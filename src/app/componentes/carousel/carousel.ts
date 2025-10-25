import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})
export class Carousel {
  images = [
    {
      url: 'https://picsum.photos/id/1018/1600/900',
      title: 'Primera imagen',
      text: 'Un hermoso paisaje natural para comenzar.',
      interval: 3000
    },
    {
      url: 'https://picsum.photos/id/1025/1600/900',
      title: 'Segunda imagen',
      text: 'La naturaleza y su esplendor en cada detalle.',
      interval: 3000
    },
    {
      url: 'https://picsum.photos/id/1039/1600/900',
      title: 'Tercera imagen',
      text: 'Colores que inspiran y transmiten calma.',
      interval: 3000
    }
  ];
}
