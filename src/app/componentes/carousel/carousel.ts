import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class Carousel {
  images = [
    {
      url: 'assets/carousel/sonrisa.jpg',
      title: 'DentalHub',
      text: 'Expertos en nuestro labor.',
      interval: 3000
    },
    {
      url: 'assets/carousel/sonrisa_2.jpg',
      title: 'La vida se trata de sonrisas',
      text: 'Sonreí cada día a día.',
      interval: 3000
    },
    {
      url: 'assets/carousel/odontologo.jpg',
      title: 'Te ayudamos en lo que sea',
      text: 'Si tenés caries, podes reservar un turno.',
      interval: 3000
    }
  ];
}
