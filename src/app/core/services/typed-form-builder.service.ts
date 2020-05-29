import { AbstractControlOptions, AsyncValidatorFn, FormBuilder, ValidatorFn } from '@angular/forms';
import { ITypedFormArray, ITypedFormGroup } from '../interfaces/forms.interface';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TypedformBuilder<T extends {[key: string]: any}> extends FormBuilder {
  group(
    controlsConfig: {
      [p in keyof T]: any;
    },
    options?: AbstractControlOptions | {
      [key: string]: any;
    } | null
  ): ITypedFormGroup<T> {
    return super.group(controlsConfig, options) as ITypedFormGroup<T>;
  };

  array<V = any>(
    controlsConfig: V[],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): ITypedFormArray<V> {
    return super.array(controlsConfig, validatorOrOpts, asyncValidator);
  }
}
