import { from, of, Subject } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";

class Endpoint {
  private subject = new Subject<string>();
  constructor(private url: string) {}
  public request$ = this.subject.pipe(
    map((url) => ({
      url,
    }))
  );
  public response$ = this.request$.pipe(
    switchMap((request) => {
      console.info("fetch", request);
      return from(fetch(request.url));
    }),
    mergeMap((response) => from(response.json())),
    catchError((err) => {
      console.error(err);
      return of(err.message);
    })
  );
  dispatch(param: string) {
    console.log(param);
    this.subject.next(param);
  }
}

export class Service {
  private serviceSubject = new Subject();
  public service$ = this.serviceSubject.asObservable();

  public document = new Endpoint("/api/document");
}

const srv = new Service();
