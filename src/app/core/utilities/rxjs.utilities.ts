import { of } from 'rxjs';
import { delay, expand, switchMap, takeWhile } from 'rxjs/operators';


export const asyncArraySwitchMap = <T>(chunkSize = 10) =>
  switchMap((initialArray: T[]) =>
    of(initialArray.slice(0, chunkSize))
      .pipe(
        expand(arrayChunk => {
          if (arrayChunk.length < initialArray.length) {
            return of(initialArray.slice(0, arrayChunk.length + chunkSize)).pipe(delay(0));
          }
        }),
        takeWhile(arrayChunk => arrayChunk.length < initialArray.length, true),
      )
  );
