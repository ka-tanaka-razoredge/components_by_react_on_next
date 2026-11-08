import { useEffect, useRef, useState } from 'react';

import Editor from "@monaco-editor/react";

type LauncherProps = {
  doIt: (value: string, title: string) => Promise<void>;
  initialTitle?: string | null;
  initialValue?: string | null;
  posting?: boolean;
};

export default ({
  doIt,
  initialTitle,
  initialValue,
  posting = false,
}: LauncherProps) => {
  const textarea = useRef();
  const [html, setHtml] = useState(
  `<div>
  <div>
  </div>
  <div class="margin-1">
    <div>
    </div>
  </div>
</div>
`);
  const [title, setTitle] = useState('');
  const [editorInstance, setEditorInstance] = useState(null);
  const applyRef = useRef<(parsable?: string) => void>(null);

  useEffect(() => {
    if (initialTitle !== undefined) {
      setTitle(initialTitle ?? '');
    }
  }, [initialTitle]);

  useEffect(() => {
    if (initialValue !== undefined) {
      setHtml(initialValue ?? '');
    }
  }, [initialValue]);

  const onEditorMount = (editor, monaco) => {
    editor.onDidBlurEditorText(() => {
      if (applyRef.current) {
        applyRef.current(editor.getValue());
      }
    });
    setEditorInstance(editor);
    setEditorInstance(editor);
  };

  return (
    <>
      <style>
      {
        `
        `
      }
      </style>
      <div>
        <button onClick={() => void doIt(html, title)} disabled={posting}>post</button>
        <div>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title"
          />
        </div>
        <div>
          <Editor
            ref={textarea}
            height={`${10}rem`}
            defaultLanguage="javascript"
            value={html}
            onMount={onEditorMount}
            onChange={(value) => setHtml(value ?? "")}
            options={{
              folding: true,
              lineNumbers: "on",
              minimap: { enabled: false },
            }}
          />
        </div>
      </div>
    </>
  );
};
