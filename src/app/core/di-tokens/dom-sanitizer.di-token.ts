import { InjectionToken } from '@angular/core';
import { DomSanitizerOptions } from '../constants/dom-sanitizer.constant';


export const DomSanitizerOptionsToken = new InjectionToken('DOM Sanitizer Options', {
  providedIn: 'root',
  factory: () => DomSanitizerOptions
});
