import { Pipe, PipeTransform, inject } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user-model';

@Pipe({
  name: 'user',
  standalone: true
})
export class UserPipe implements PipeTransform {

  private userService = inject(UserService);

  transform(id: string, property?: 'name'): Promise<string | null> {
    return this.userService.show(id)
      .then(res => {
        if (res.exists()) {
          const system = res.data() as User;
          return system.email;
        } else {
          return 'System Not Found';
        }
      });
  }
}
