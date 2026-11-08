import { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
};

export default (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef(null);
  const [value, setValue] = useState(props.value);
  const [width, setWidth] = useState(`${2}rem`);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (measureRef.current) {
      console.log(measureRef.current.getBoundingClientRect().width / 16);
//      if (1 <= (5 - (measureRef.current.getBoundingClientRect().width / 16))) setWidth(`${measureRef.current.getBoundingClientRect().width + 1}rem`);
    }
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }

    if (e.key === 'Escape') {
      setValue(props.value);
      setIsEditing(false);
    }
  };

  const drawValue = () => {
    if (isEditing) {
      return (
        <span title={value}>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={handleKeyDown}
          />
        </span>
      );
    } else {
      return (
        <span title={value}>
          {value}
        </span>
      );
    }
  }
  
  return (
    <>
      <style>
      {
        `
          .tag-container {
            position: relative;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            width: fit-content;
            overflow: hidden;
  min-height: 1.5rem;
          }

          .tag {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 5rem;
            min-width: ${width};
          }

          .tag input {
            border: none;
            outline: none;
            width: 100%;
            box-sizing: border-box;
          }
          
          .close-box {
            position: absolute;
            z-index: 1100;
            top: 50%;
            transform: translateY(-50%);
            right: 0.25rem;
            width: 0.75rem;
            height: 0.75rem;
            boder: 1px solid black;
            background-color: white;

            line-height: 0.85;
          }
        `
      }
      </style>
      <div className="tag-container" onDoubleClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>
        <div className="tag" onDoubleClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>{drawValue()}</div>
        <div className="close-box">✕</div>
      </div>
      <div
        ref={measureRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>     
    </>
  );
};
