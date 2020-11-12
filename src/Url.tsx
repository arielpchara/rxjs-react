import React, { FC, useEffect, useState } from "react";
import { map } from "rxjs/operators";
import { url$ } from "./get";
import { Service } from "./service/service";

const service = new Service();

export const Url: FC = () => {
  const [url, setUrl] = useState("");
  const [document, setDocument] = useState("");
  useEffect(() => {
    const subscription = service.document.response$
      .pipe(map((response) => JSON.stringify(response, null, 2)))
      .subscribe({
        next: (doc) => setDocument(doc),
        complete: () => console.log("fim"),
      });
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    return url$.subscribe((url) => {
      service.document.dispatch(url);
      setUrl(url);
    }).unsubscribe;
  }, []);
  return (
    <>
      <h1>URL after delay: {url}</h1>
      <pre>{document}</pre>
    </>
  );
};
