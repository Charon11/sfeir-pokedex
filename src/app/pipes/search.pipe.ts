import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }


  transform(values: any[], filter: string): any {
    return filter ? values.filter(pokemon => {
        return pokemon.id === parseInt(filter, 10) ||
          this.translateService.instant(pokemon.name).toLowerCase().indexOf(filter.toLowerCase()) >= 0
          /*|| pokemon.types.findIndex(
            type => this.translateService.instant(type.type.name).toLowerCase().indexOf(filter.toLowerCase()) >= 0) >= 0*/;
      })
      : values;
  }

}
