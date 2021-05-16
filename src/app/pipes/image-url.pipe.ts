import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const imageApi = environment.image_api;

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {


  transform(url: any, args: any[]): any {

    console.log(args);
    

    url = `${imageApi}`;
    console.log(url);
    url = url.replace('service', args[0]);
    url = url.replace('image', args[1]);

    console.log('image', url);
    
    return url;
  }

}
