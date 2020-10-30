import React, { FC, useCallback, useEffect, useState } from "react";
import { all$, sendMessage } from "./string";

export const StringFormatter: FC = () => {
  const [formatted, setFormatted] = useState({});
  const [input, setInput] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  useEffect(() => {
    sendMessage(input);
  }, [input]);

  useEffect(() => {
    return all$.subscribe(setFormatted).unsubscribe;
  }, []);

  return (
    <>
      <div>
        <input type="text" onChange={handleChange} value={input} />
      </div>
      <h2>Formatted</h2>
      <pre>{JSON.stringify(formatted, null, 2)}</pre>
    </>
  );
};
