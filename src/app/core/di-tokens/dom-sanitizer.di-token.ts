import { InjectionToken } from '@angular/core';
import { domSanitizerOptions } from '../constants/dom-sanitizer.constant';


export const DomSanitizerOptionsToken = new InjectionToken('DOM Sanitizer Options', {
  providedIn: 'root',
  factory: () => domSanitizerOptions
});
