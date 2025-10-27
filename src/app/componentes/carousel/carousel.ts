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
      title: 'Primera imagen',
      text: 'Una sonrisa perfecta.',
      interval: 3000
    },
    {
      url: 'assets/carousel/sonrisa_2.jpg',
      title: 'Segunda imagen',
      text: 'Una buena sonrisa para el día a día.',
      interval: 3000
    },
    {
      url: 'assets/carousel/odontologo.jpg',
      title: 'Tercera imagen',
      text: 'Si tenés caries, anda a que te revisen.',
      interval: 3000
    }
  ];
}
