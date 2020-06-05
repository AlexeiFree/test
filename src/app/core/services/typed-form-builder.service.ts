import { AbstractControlOptions, AsyncValidatorFn, FormBuilder, ValidatorFn } from '@angular/forms';
import { ITypedFormArray, ITypedFormGroup } from '../interfaces/forms.interface';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TypedFormBuilder<T extends {[key: string]: any}> extends FormBuilder {
  group(
    controlsConfig: {
      [p in keyof T]: T[p];
    },
    options?: AbstractControlOptions | {
      [key: string]: any;
    } | null
  ): ITypedFormGroup<T> {
    return super.group(controlsConfig, options) as ITypedFormGroup<T>;
  }

  array<U = any>(
    controlsConfig: U[],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): ITypedFormArray<U> {
    return super.array(controlsConfig, validatorOrOpts, asyncValidator);
  }
}
