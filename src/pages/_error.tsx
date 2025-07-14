import React from 'react';
import { NextPage } from 'next';
import ContainerWrapper from '../components/ui/ContainerWrapper';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <ContainerWrapper>
        <div className="max-w-md w-full mx-auto text-center p-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {statusCode ? `${statusCode} 오류` : '오류가 발생했습니다'}
          </h1>
          <p className="text-white/80 mb-8">
            {statusCode
              ? `서버에서 ${statusCode} 오류가 발생했습니다.`
              : '클라이언트에서 오류가 발생했습니다.'}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </ContainerWrapper>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 