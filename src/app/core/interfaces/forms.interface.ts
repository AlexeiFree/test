import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export interface ITypedAbstractControl<T = any> extends AbstractControl {
  readonly valueChanges: Observable<T> | null;
}

export interface ITypedFormGroup<T extends {[key: string]: any}> extends FormGroup {
  controls: ITypedFormControls<T>;
  valueChanges: Observable<T>;

  setControl(name: keyof T, control: ITypedAbstractControl): void;

  removeControl(name: keyof T): void;
}

export interface ITypedFormArray<T = any> extends FormArray {
  controls: ITypedAbstractControl<T>[];
  valueChanges: Observable<T>;
}

export type ITypedFormControls<T> = {
  [p in keyof T]: T[p] extends (infer U)[] ? ITypedFormArray<U> : ITypedAbstractControl<T[p]>;
};
