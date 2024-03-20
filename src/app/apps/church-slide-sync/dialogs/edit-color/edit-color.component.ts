import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

const COLORS = [
  [ 'bg-white', 'bg-black', 'bg-white', 'bg-black', 'bg-white' ],
  [ 'bg-red-100', 'bg-red-300', 'bg-red-500', 'bg-red-700', 'bg-red-900' ],
  [ 'bg-amber-100', 'bg-amber-300', 'bg-amber-500', 'bg-amber-700', 'bg-amber-900' ],
  [ 'bg-yellow-100', 'bg-yellow-300', 'bg-yellow-500', 'bg-yellow-700', 'bg-yellow-900' ],
  [ 'bg-green-100', 'bg-green-300', 'bg-green-500', 'bg-green-700', 'bg-green-900' ],
  [ 'bg-teal-100', 'bg-teal-300', 'bg-teal-500', 'bg-teal-700', 'bg-teal-900' ],
  [ 'bg-cyan-100', 'bg-cyan-300', 'bg-cyan-500', 'bg-cyan-700', 'bg-cyan-900' ],
  [ 'bg-blue-100', 'bg-blue-300', 'bg-blue-500', 'bg-blue-700', 'bg-blue-900' ],
  [ 'bg-indigo-100', 'bg-indigo-300', 'bg-indigo-500', 'bg-indigo-700', 'bg-indigo-900' ],
  [ 'bg-purple-100', 'bg-purple-300', 'bg-purple-500', 'bg-purple-700', 'bg-purple-900' ],
  [ 'bg-pink-100', 'bg-pink-300', 'bg-pink-500', 'bg-pink-700', 'bg-pink-900' ],
  [ 'bg-stone-100', 'bg-stone-300', 'bg-stone-500', 'bg-stone-700', 'bg-stone-900' ],
  [ 'bg-slate-100', 'bg-slate-300', 'bg-slate-500', 'bg-slate-700', 'bg-slate-900' ],
]

@Component({
  selector: 'app-edit-color',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './edit-color.component.html',
  styleUrl: './edit-color.component.scss'
})

export class EditColorComponent {

  dialogRef = inject(MatDialogRef);

  colors = COLORS;

  selectColor(color: string) {
    this.dialogRef.close(color);
  }
}
