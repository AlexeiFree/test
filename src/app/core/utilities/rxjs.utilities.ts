import { of, pipe } from 'rxjs';
import { delay, expand, map, switchMap, takeWhile } from 'rxjs/operators';

interface IAsyncArrayExpandData<T> {
  array: T[];
  arrayChunk: T[];
}

export const asyncArrayPipe = <T>(chunkSize = 10) =>
  pipe(
    switchMap((initialArray: T[]) =>
      of(initialArray)
        .pipe(
          map((array: T[]) => ({
            array,
            arrayChunk: array.slice(0, chunkSize)
          }) as IAsyncArrayExpandData<T>),
          expand(data => {
            if (data.arrayChunk.length < data.array.length) {
              return of({
                array: data.array,
                arrayChunk: data.array.slice(0, data.arrayChunk.length + chunkSize)
              } as IAsyncArrayExpandData<T>)
                .pipe(delay(0));
            }
          }),
          takeWhile(data => data.arrayChunk.length < data.array.length, true),
          map(data => data.arrayChunk)
        )
    )
  );