import { ChangeEvent, useEffect, useRef, useState } from 'react';

export const useEditableDiv = (initial: HTMLDivElement | null) => {
  const $contentEditable = useRef(initial);
  const [content, _setContent] = useState<HTMLDivElement | null>(initial);

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    _setContent(event.target);
    // console.dir(event.target);
    // console.log(event.target.innerText);
  };

  const setContent = (newContent: HTMLDivElement | null) => {
    if ($contentEditable.current) {
      $contentEditable.current = newContent;
      _setContent(newContent);
    }
  };

  useEffect(() => {
    setContent(initial);
  }, [initial]);
  return { content, setContent, onInput, $contentEditable };
};
