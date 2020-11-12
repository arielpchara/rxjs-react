import { of } from "rxjs";
import { debounceTime, delay, map, mergeMap } from "rxjs/operators";
import { kebab$ } from "./string";

const getFromSomewhere = (path: string) => {
  return of(path).pipe(
    delay(200),
    map((url) => `https://localhost:8080/${url}`)
  );
};

export const url$ = kebab$.pipe(debounceTime(300), mergeMap(getFromSomewhere));
