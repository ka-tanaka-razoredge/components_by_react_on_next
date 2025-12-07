import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default () => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const [destination, setDestination] = useState('');
  const select = useRef();

  const handleDrop = (e) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);

    // プレビュー用のオブジェクトを作成
    const previews = droppedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPreviewFiles((prev) => [...prev, ...previews]);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // デフォルト動作を無効化
  };
  
  const uploadFile = async (fileObject, index) => {
    const formData = new FormData();
    formData.append("destination", destination);
    formData.append("file", fileObject.file);

    setPreviewFiles((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: "uploading" } : item
      )
    );

    try {
      const response = await axios.post("https://razor-edge.net/gold/razor_edge/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("アップロード成功:", response.data);

      setPreviewFiles((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, status: "success" } : item
        )
      );
    } catch (error) {
      console.error("アップロード失敗:", error);
      setPreviewFiles((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, status: "error" } : item
        )
      );
    }
  };
  
  const removePreview = (index) => {
    // プレビューリソースを解放
    URL.revokeObjectURL(previewFiles[index].preview);
    setPreviewFiles((prev) => prev.filter((_, i) => i !== index));
  };
  
  const onChangeDestination = (e) => {
    setDestination(e.target.value);
  };
  
  useEffect(() => {
    setDestination(select.current.options[0].value);  
  }, []);

  return (
    <>
      <style>
      {
        `
          .sender {
            border: 1px solid black;
            background-color: silver;
            .droppable {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100px;
              background-color: rgba(0, 0, 0, 0.1);
              color: white;
              margin: 4px;
            }
            .select {
              margin: 4px;
            }
            .vertical-separator {
              height: 4px;
            }
          }
        `
      }
      </style>
      <div className="sender">
        <div className="droppable" onDrop={handleDrop} onDragOver={handleDragOver}>Drop here</div>
        <div className="select">
          <select ref={select} onChange={onChangeDestination}>
            <option value="ss">ss</option>
            <option value="not_ss">not ss</option>
            <option value="english">english</option>
            <option value="music">music</option>
          </select>
        </div>

        <div>
          {previewFiles.map((preview, index) => (
            <div key={index} className="preview-item">
              <div>
                <div>{preview.file.name}</div>
                <button onClick={() => uploadFile(preview, index)}>upload</button>
                <button onClick={() => removePreview(index)}>cancel</button>
              </div>
              <div className="vertical-separator"></div>
              <div>
                {/* 画像ファイルの場合 */}
                {preview.file.type.startsWith("image/") && (
                  <img
                    src={preview.preview}
                    alt={preview.file.name}
                    className="preview-image"
                  />
                )}
                {/* 動画ファイルの場合 */}
                {preview.file.type.startsWith("video/") && (
                  <video
                    controls
                    className="preview-video"
                    src={preview.preview}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );  
};
