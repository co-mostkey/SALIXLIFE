import React, { ReactNode, ElementType } from 'react';

interface ContainerWrapperProps {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
  as?: ElementType;
}

/**
 * 모든 페이지에서 일관된 좌우 여백을 제공하는 컨테이너 래퍼 컴포넌트
 * 
 * @param children - 컨테이너에 포함될 내용
 * @param className - 추가적인 CSS 클래스
 * @param fluid - true일 경우 최대 너비 제한 없음 (full width)
 * @param as - 렌더링할 HTML 요소 (기본값: div)
 */
export default function ContainerWrapper({
  children,
  className = '',
  fluid = false,
  as: Component = 'div'
}: ContainerWrapperProps) {
  return (
    <Component
      className={`px-6 md:px-8 mx-auto w-full ${
        fluid ? '' : 'max-w-7xl'
      } ${className}`}
    >
      {children}
    </Component>
  );
} 