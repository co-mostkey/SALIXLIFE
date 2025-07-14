import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// React Quill을 동적으로 import (SSR 문제 방지)
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-50 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-gray-500">에디터 로딩 중...</div>
  </div>
}) as any;

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "내용을 입력하세요...",
  className = "",
  error
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Quill 모듈 설정
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }), []);

  // Quill 포맷 설정
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

  // 클라이언트에서만 렌더링
  if (!isMounted) {
    return (
      <div className="h-64 bg-gray-50 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">에디터 로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={`rich-text-editor ${className}`}>
      <div className={error ? 'border-2 border-red-500 rounded-lg' : ''}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{
            height: '400px',
            marginBottom: '42px' // 툴바 높이만큼 여백
          }}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <span className="text-red-500">⚠</span>
          {error}
        </p>
      )}
      
      <style jsx global>{`
        /* Quill Snow Theme 스타일 오버라이드 */
        .ql-toolbar.ql-snow {
          border: 1px solid #e5e7eb;
          border-bottom: none;
          border-radius: 8px 8px 0 0;
          background: #f9fafb;
          padding: 10px;
        }
        
        .ql-container.ql-snow {
          border: 1px solid #e5e7eb;
          border-radius: 0 0 8px 8px;
          font-size: 16px;
          line-height: 1.6;
          background-color: #ffffff;
        }
        
        .ql-editor {
          min-height: 350px;
          padding: 20px;
          color: #000000 !important;
          background-color: #ffffff !important;
        }
        
        /* 모든 텍스트 요소에 검은색 적용 */
        .ql-editor p,
        .ql-editor div,
        .ql-editor span,
        .ql-editor h1,
        .ql-editor h2,
        .ql-editor h3,
        .ql-editor h4,
        .ql-editor h5,
        .ql-editor h6,
        .ql-editor li,
        .ql-editor blockquote,
        .ql-editor pre,
        .ql-editor code {
          color: #000000 !important;
        }
        
        /* 플레이스홀더 스타일 */
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: italic;
          left: 20px;
          right: 20px;
        }
        
        /* 툴바 아이콘 스타일 */
        .ql-toolbar .ql-picker-label {
          color: #374151;
        }
        
        .ql-toolbar .ql-stroke {
          stroke: #374151;
        }
        
        .ql-toolbar .ql-fill,
        .ql-toolbar .ql-stroke.ql-fill {
          fill: #374151;
        }
        
        .ql-toolbar button:hover .ql-stroke {
          stroke: #0d4f3c;
        }
        
        .ql-toolbar button:hover .ql-fill,
        .ql-toolbar button:hover .ql-stroke.ql-fill {
          fill: #0d4f3c;
        }
        
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #0d4f3c;
        }
        
        .ql-toolbar button.ql-active .ql-fill,
        .ql-toolbar button.ql-active .ql-stroke.ql-fill {
          fill: #0d4f3c;
        }
        
        /* 툴바 드롭다운 스타일 */
        .ql-toolbar .ql-picker {
          color: #374151;
        }
        
        .ql-toolbar .ql-picker-options {
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .ql-toolbar .ql-picker-item {
          color: #374151;
        }
        
        .ql-toolbar .ql-picker-item:hover {
          color: #0d4f3c;
          background-color: #f3f4f6;
        }
        
        /* 에디터 내부 요소 스타일 */
        .ql-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 16px;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
        }
        
        .ql-editor pre {
          background-color: #f3f4f6;
          border-radius: 4px;
          padding: 12px;
          overflow-x: auto;
        }
        
        .ql-editor code {
          background-color: #f3f4f6;
          padding: 2px 4px;
          border-radius: 3px;
          font-size: 0.875em;
        }
        
        .ql-editor a {
          color: #0d4f3c;
          text-decoration: underline;
        }
        
        .ql-editor a:hover {
          color: #064e3b;
        }
        
        /* 리스트 스타일 */
        .ql-editor ul,
        .ql-editor ol {
          padding-left: 1.5em;
        }
        
        .ql-editor li {
          margin-bottom: 0.5em;
        }
        
        /* 이미지 스타일 */
        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 1em 0;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor; 