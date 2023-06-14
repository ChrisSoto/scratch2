import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine',
  standalone: true
})
export class NewLinePipe implements PipeTransform {

  transform(value: string, maxLetters: number): string {
    const words = value.split(' ');
    let totalLetters = 0;
    let subLineArr: string[] = [];
    let lineArr: string[][] = [];

    for (let i = 0; i < words.length; i++) {
      if (totalLetters <= maxLetters && !this.wordTooBig(maxLetters, totalLetters, words[i])) {

        // add word
        subLineArr.push(words[i]);
        // add word length to total
        totalLetters = totalLetters + words[i].length;

      } else {
        // add new sub line
        lineArr.push(subLineArr);
        // start another
        subLineArr = [];
        subLineArr.push(words[i]);
        totalLetters = words[i].length;
      }

      // reach the end of line before hitting max
      if (i === words.length - 1) {
        if (subLineArr.length === 1) {
          // pull last from lineArr and put in this subLine
          const lastWord = lineArr[lineArr.length - 1].pop();
          if (lastWord) subLineArr.unshift(lastWord);
        }
        lineArr.push(subLineArr);
      }
    }

    let newLine = '';

    for (let i = 0; i < lineArr.length; i++) {
      if (!newLine.length) {
        // first line
        newLine = this.arrToLine(lineArr[i]);
      } else {
        // indented lines
        newLine = newLine + ' <br /> <span class="pl-6">' + this.arrToLine(lineArr[i]) + '</span>';
      }
    }

    return newLine;
  }

  arrToLine(words: string[]): string {
    let line = '';
    for (let i = 0; i < words.length; i++) {
      line = line.length ? line + ' ' + words[i] : words[i];
    }
    return line;
  }

  wordTooBig(max: number, totalLetters: number, word: string): boolean {
    return (word.length + totalLetters > max) && word.length >= 5;
  }

}
