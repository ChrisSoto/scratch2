import { Pipe, PipeTransform } from '@angular/core';

interface OrderByPipeType {
  order: number;
  [key: string]: any;
}

@Pipe({
  name: "orderBy",
  standalone: true,
})
export class OrderByPipe implements PipeTransform {
  transform(value: OrderByPipeType[], dir: "asc" | "desc" = "asc"): OrderByPipeType[] {
    return value.sort((a, b) => {
      if (dir === "asc") {
        return a.order - b.order;
      } else if (dir === "desc") {
        return b.order - a.order;
      }
      return 0;
    });
  }
}
