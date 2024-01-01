import { Injectable, signal } from '@angular/core';
import { PData, PDataTree2 } from '../model/models.interface';

@Injectable()
export class PatternDataTreeService {

  constructor() { }

  dataTree = signal<PDataTree2[]>([])

  setup(data: PData[]) {
    console.log(data.length)

    const tree: PDataTree2[] = [];

    for (let i = 0; i < data.length; i++) {
      tree.push({
        id: data[i].id,
        self: data[i],
        children: [],
        child: false,
        onlyTitle: data[i].data.blocks[0].data === '[[ hide-textarea ]]',
        generator: data[i].generatorIds.length > 0,
      });
    }

    // add children to parents
    for (let i = 0; i < tree.length; i++) {
      for (let j = 0; j < tree.length; j++) {
        if (tree[i].id !== '') {

          if (tree[i].id === tree[j].self.parentId) {
            tree[j].child = true;
            tree[i].children.push(tree[j]);
          }
        }
      }
    }

    const newTree = [];

    for (let i = 0; i < tree.length; i++) {
      
      // console.log(tree[i].children.length);
      if (tree[i].self.depth === 0) {
        console.log(tree[i].self.data.title);
        // console.log(tree[i])
        newTree.push(tree[i]);
      }
    }

    // console.log(tree);
    this.dataTree.set(newTree);
  }

}
