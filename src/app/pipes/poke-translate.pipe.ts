import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokeTranslate'
})
export class PokeTranslatePipe implements PipeTransform {

  transform(values: any[], lang: string, property: string): any {
    return values ? values.find(val => val.language.name === lang)[property] : values;
  }

}
