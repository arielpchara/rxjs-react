import React, { FC, useCallback, useEffect, useState } from "react";
import { all$, getValue, sendMessage } from "./string";

export const StringFormatter: FC = () => {
  const [formatted, setFormatted] = useState({});
  const [input, setInput] = useState(getValue());

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
        <label>
          <div>Input a text</div>
          <input type="text" onChange={handleChange} value={input} />
        </label>
      </div>
      <h2>Formatted text</h2>
      <pre>{JSON.stringify(formatted, null, 2)}</pre>
    </>
  );
};
