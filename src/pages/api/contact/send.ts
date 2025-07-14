import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // 필수 필드 검증
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: '필수 정보를 모두 입력해주세요.' });
    }

    // 이메일 유효성 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: '올바른 이메일 주소를 입력해주세요.' });
    }

    // 실제 이메일 전송 로직
    // 여기서는 콘솔에 로그만 남기고 성공 응답을 반환합니다.
    // 실제 프로덕션에서는 nodemailer, SendGrid, AWS SES 등을 사용하여 이메일을 전송합니다.
    
    console.log('Contact Form Submission:', {
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // 이메일 내용 포맷팅
    const emailContent = `
      새로운 문의가 접수되었습니다.
      
      ===== 문의 정보 =====
      이름: ${name}
      이메일: ${email}
      전화번호: ${phone || '미입력'}
      문의 유형: ${subject}
      
      ===== 문의 내용 =====
      ${message}
      
      ===== 접수 시간 =====
      ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
    `;

    // TODO: 실제 이메일 전송 구현
    // const info = await sendEmail({
    //   to: 'info@salixlife.com',
    //   subject: `[SALIX Life 문의] ${subject} - ${name}`,
    //   text: emailContent
    // });

    // 성공 응답
    return res.status(200).json({ 
      success: true,
      message: '문의가 성공적으로 접수되었습니다.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: '문의 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
    });
  }
} 