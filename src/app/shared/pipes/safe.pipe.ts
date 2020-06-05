import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { domSanitizerOptions, DomSanitizerOptionType } from '../../core/constants/dom-sanitizer.constant';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any, type: DomSanitizerOptionType): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case domSanitizerOptions.HTML: return this.sanitizer.bypassSecurityTrustHtml(value);
      case domSanitizerOptions.STYLE: return this.sanitizer.bypassSecurityTrustStyle(value);
      case domSanitizerOptions.SCRIPT: return this.sanitizer.bypassSecurityTrustScript(value);
      case domSanitizerOptions.URL: return this.sanitizer.bypassSecurityTrustUrl(value);
      case domSanitizerOptions.RESOURCE_URL: return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
