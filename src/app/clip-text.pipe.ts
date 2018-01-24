import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'clipText'
})

export class ClipTextPipe implements PipeTransform {
  transform(text: string, maxLength = 70): string {
    if (!text) {
      return text;
    }
    return text.trim().length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  }
}
