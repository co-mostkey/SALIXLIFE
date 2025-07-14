import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import ContainerWrapper from '../components/ui/ContainerWrapper';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>페이지를 찾을 수 없습니다 | 샐릭스 라이프</title>
        <meta name="description" content="요청하신 페이지를 찾을 수 없습니다." />
      </Head>

      <section className="flex items-center justify-center min-h-screen bg-dark">
        <ContainerWrapper>
          <div className="max-w-lg w-full mx-auto text-center">
            <Image src="/images/salix-logo-v2.svg?v=1" alt="샐릭스 라이프" width={96} height={96} className="mx-auto mb-8" />
            <h1 className="text-5xl text-white font-bold mb-4">404</h1>
            <h2 className="text-2xl text-secondary font-semibold mb-6">페이지를 찾을 수 없습니다</h2>
            <p className="text-white/70 mb-8">
              요청하신 페이지가 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수 없습니다.
            </p>
            <Link href="/" className="btn-primary">
              홈으로 돌아가기
            </Link>
          </div>
        </ContainerWrapper>
      </section>
    </>
  );
}