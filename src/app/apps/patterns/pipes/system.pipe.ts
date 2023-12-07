import { Pipe, PipeTransform, inject } from '@angular/core';
import { PatternSystemService } from '../services/pattern-system.service';
import { PSystem } from '../model/models.interface';

@Pipe({
  name: 'system',
  standalone: true,
})
export class SystemPipe implements PipeTransform {

  private systemService = inject(PatternSystemService);

  transform(id: string, property?: 'name'): Promise<string> {
    return this.systemService.read(id)
      .then(res => {
        if (res.exists()) {
          const system = res.data() as PSystem;
          return system.name;
        } else {
          return 'System Not Found';
        }
      });
  }

}
