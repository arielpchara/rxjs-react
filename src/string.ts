import { BehaviorSubject, from, Subject, zip } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";

const main = new BehaviorSubject<string>(
  String(localStorage.getItem("message"))
);

export const getValue = () => {
  return main.value;
};

export const clean$ = main.pipe(
  map((incoming: string) => incoming.replace(/\W/g, " ").replace(/\s+/g, " ")),
  tap((cleaned) => {
    localStorage.setItem("message", cleaned);
  })
);

export const capital$ = clean$.pipe(
  map((incoming: string) =>
    incoming.replace(/^\w| \w/g, (letter) => letter.toUpperCase())
  )
);

export const kebab$ = clean$.pipe(
  map((incoming: string) =>
    incoming
      .replace(/(?! )\W/g, " ")
      .trim()
      .replace(/ /g, "-")
      .toLowerCase()
  )
);

export const snake$ = kebab$.pipe(
  map((incoming: string) => incoming.replace(/-/g, "_"))
);

export const camel$ = clean$.pipe(
  map((incoming: string) =>
    incoming
      .replace(/(?!^\w) \w/g, (letter) => letter.toUpperCase())
      .replace(/ |\W/g, "")
  )
);

export const pascal$ = camel$.pipe(
  map((incoming) => incoming.replace(/^./, (letter) => letter.toUpperCase()))
);

export const delayed$ = main.pipe(
  mergeMap((incoming) => {
    return from(
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      })
    );
  })
);

export const all$ = zip(
  main.asObservable(),
  clean$,
  capital$,
  camel$,
  pascal$,
  kebab$,
  snake$
  // delayed$
).pipe(
  map(([original, clean, capital, camel, pascal, kebab, snake, delayed]) => ({
    original,
    clean,
    capital,
    camel,
    pascal,
    kebab,
    snake,
    delayed,
  }))
);

// all$.subscribe(console.log.bind(console, 'subscribe'))

export const sendMessage = (message: string) => {
  main.next(message);
};
