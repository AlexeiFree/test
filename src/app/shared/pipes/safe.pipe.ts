import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizerOptions } from '../../core/constants/dom-sanitizer.constant';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any, type: DomSanitizerOptions): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case DomSanitizerOptions.HTML: return this.sanitizer.bypassSecurityTrustHtml(value);
      case DomSanitizerOptions.STYLE: return this.sanitizer.bypassSecurityTrustStyle(value);
      case DomSanitizerOptions.SCRIPT: return this.sanitizer.bypassSecurityTrustScript(value);
      case DomSanitizerOptions.URL: return this.sanitizer.bypassSecurityTrustUrl(value);
      case DomSanitizerOptions.RESOURCE_URL: return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
