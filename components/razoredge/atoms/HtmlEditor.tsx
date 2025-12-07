import React, { useRef, useState } from 'react';
import Editor from "@monaco-editor/react";

const HtmlEditor = () => {
  const textarea = useRef();
  const [html, setHtml] = useState(`<div class="margin-1">
	<div>root</div>
	<div class="margin-1">
	</div>
</div>`);
  
  const [editorInstance, setEditorInstance] = useState(null);
  const onEditorMount = (editor, monaco) => {
    editor.getModel()?.updateOptions({
      insertSpaces: false,
      tabSize: 2,
    });
    
    
    // ペースト後に自動整形
  editor.onDidPaste(() => {
    setTimeout(() => {
      const model = editor.getModel();
      if (!model) return;

      const fullRange = model.getFullModelRange();
      const originalText = model.getValue();

      // エスケープ解除
      const unescapedText = originalText.replace(/\\"/g, '"');

      if (unescapedText !== originalText) {
        editor.executeEdits(null, [
          {
            range: fullRange,
            text: unescapedText,
            forceMoveMarkers: true,
          },
        ]);
      }

      // 整形実行（prettierFormatHTMLは自前関数）
      editor.getAction('editor.action.formatDocument')?.run();
    }, 50);
  });


    // HTML をフォーマットできるようにする
    monaco.languages.registerDocumentFormattingEditProvider("html", {
      provideDocumentFormattingEdits(model, options, token) {
        const formatted = prettierFormatHTML(model.getValue()); // 自前整形関数（後述）
        return [
          {
            range: model.getFullModelRange(),
            text: formatted,
          },
        ];
      },
    });
  };
  
  const setData = async () => {
    // TODO: toast
    alert('copied');
    await global.navigator.clipboard.writeText(html.replace(/[\t\r\n]+/g, '').replace(/"/g, '\\"'));
  };
  
  return (
    <>
      <style>
      {
        `
          .html-editor {
            width: 50%;
            height: 50%;

            color: white;
            background: linear-gradient(90deg, rgba(95, 101, 39, 1.0), rgba(95, 101, 39, 0.5));
            font-family: "Times new roman";
            
            .editor-and-preview {
              display: flex;
              margin-top: 0.25rem;
              margin-bottom: 0.25rem;
              margin-left: 0.25rem;
              gap: 0.25rem;
            }
            
            .preview-pane {
              width: 16rem;
              height: 9rem;
              color: black;
              background-color: white;
              
//              display: flex; align-items: center; justify-content: center;
            }
            
            .footer-pane {
              margin-top: 0.25rem;
              margin-left: 0.25rem;
            }
          }
        `
      }
      </style>
      <div className="html-editor"
        onClick={ (event) => { event.stopPropagation(); } }
      >
        <div className="editor-and-preview">
          <div style={{ height: `${20}rem`, width: `${20}rem` }}>
            <Editor
              ref={textarea}
              height="100%"
              defaultLanguage="javascript"
              value={html}
              onMount={onEditorMount}
              onChange={(value) => setHtml(value ?? "")}
              options={{
                folding: true,          // 折り畳み有効
                formatOnPaste: false, // 独自で制御するため
                formatOnType: false,
                lineNumbers: "on",      // 行番号表示
                minimap: { enabled: false }, // ミニマップ非表示
              }}
            />
          </div>
          <div className="preview-pane">
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </div>
        <div className="footer-pane">
          <button onClick={() => { setData(); }}>copy</button>
        </div>
      </div>
    </>
  );
};

export default HtmlEditor;
