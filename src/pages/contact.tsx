import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import FullScreenSection from '../components/ui/FullScreenSection';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useViewport } from '../contexts/ViewportContext';
import { useContactTranslation } from '../utils/i18n';

export default function Contact() {
  const { t } = useContactTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { isMobile } = useViewport();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '문의 전송에 실패했습니다.');
      }

      setSubmitSuccess(true);
      // 폼 초기화
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '문의 전송에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>{t('contact.meta.title')}</title>
        <meta name="description" content={t('contact.meta.description')} />
      </Head>

      <FullScreenSection 
        contentPadding={false}
        backgroundPattern={false}
        className="bg-gradient-to-br from-white via-gray-50 to-gray-100"
      >
        <div className="h-full flex flex-col">
          {/* 헤더 공간 확보 */}
          <div className="flex-shrink-0 h-16"></div>
          
          {/* 메인 콘텐츠 영역 */}
          <div className="flex-1 min-h-0">
            <div className={`h-full ${isMobile ? 'overflow-y-auto product-scroll-area' : 'overflow-hidden'}`}>
              <div className="h-full flex flex-col lg:flex-row">
                {/* 왼쪽: 문의 양식 */}
                <div className="flex-1 bg-white p-6 lg:p-12 overflow-y-auto product-scroll-area border-r border-gray-200">
                  <AnimatedSection animation="slideDown" className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      <span className="text-primary">{t('contact.title')}</span>
                    </h1>
                    <p className="text-gray-600">
                      {t('contact.subtitle')}
                    </p>
                  </AnimatedSection>

                  {submitSuccess ? (
                    <AnimatedSection animation="scale">
                      <div className="bg-primary/10 border border-primary p-8 rounded-xl text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", bounce: 0.5 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('contact.success.title')}</h3>
                        <p className="text-gray-600 mb-6">{t('contact.success.message')}</p>
                        <button 
                          onClick={() => setSubmitSuccess(false)}
                          className="product-cta btn-primary"
                        >
                          {t('contact.success.newInquiry')}
                        </button>
                      </div>
                    </AnimatedSection>
                  ) : (
                    <AnimatedSection animation="slideUp">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-gray-700 text-sm mb-2">{t('contact.form.name.label')} *</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                              placeholder={t('contact.form.name.placeholder')}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm mb-2">{t('contact.form.email.label')} *</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                              placeholder={t('contact.form.email.placeholder')}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="phone" className="block text-gray-700 text-sm mb-2">{t('contact.form.phone.label')}</label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                              placeholder={t('contact.form.phone.placeholder')}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="subject" className="block text-gray-700 text-sm mb-2">{t('contact.form.subject.label')} *</label>
                            <select
                              id="subject"
                              name="subject"
                              required
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all appearance-none"
                            >
                              <option value="">{t('contact.form.subject.placeholder')}</option>
                              <option value="product">{t('contact.form.subject.options.product')}</option>
                              <option value="subscription">{t('contact.form.subject.options.subscription')}</option>
                              <option value="partnership">{t('contact.form.subject.options.partnership')}</option>
                              <option value="investment">{t('contact.form.subject.options.investment')}</option>
                              <option value="other">{t('contact.form.subject.options.other')}</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-gray-700 text-sm mb-2">{t('contact.form.message.label')} *</label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={isMobile ? 4 : 6}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                            placeholder={t('contact.form.message.placeholder')}
                          ></textarea>
                        </div>
                        
                        {submitError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-600"
                          >
                            {submitError}
                          </motion.div>
                        )}
                        
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`product-cta w-full py-3 rounded-lg transition-all duration-300 ${
                            isSubmitting 
                              ? 'bg-primary/50 cursor-not-allowed' 
                              : 'bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30'
                          } text-white font-medium`}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {t('contact.form.submitting')}
                            </span>
                          ) : t('contact.form.submit')}
                        </button>
                      </form>
                    </AnimatedSection>
                  )}
                </div>
                
                {/* 오른쪽: 연락처 정보 */}
                <div className="flex-1 lg:max-w-md bg-gray-50 p-6 lg:p-12 overflow-y-auto product-scroll-area">
                  <AnimatedSection animation="slideLeft" className="h-full flex flex-col justify-center">
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.info.title')}</h2>
                        
                        <div className="space-y-6">
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-start"
                          >
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-gray-900 font-medium mb-1">{t('contact.info.address.label')}</h4>
                              <p className="text-gray-600">{t('contact.info.address.line1')}<br />{t('contact.info.address.line2')}</p>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-start"
                          >
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-gray-900 font-medium mb-1">{t('contact.info.email.label')}</h4>
                              <a href={`mailto:${t('contact.info.email.value')}`} className="text-gray-600 hover:text-primary transition-colors">
                                {t('contact.info.email.value')}
                              </a>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-start"
                          >
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-gray-900 font-medium mb-1">{t('contact.info.phone.label')}</h4>
                              <a href={`tel:${t('contact.info.phone.value').replace(/-/g, '')}`} className="text-gray-600 hover:text-primary transition-colors">
                                {t('contact.info.phone.value')}
                              </a>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-start"
                          >
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-gray-900 font-medium mb-1">{t('contact.info.hours.label')}</h4>
                              <p className="text-gray-600">{t('contact.info.hours.weekday')}<br />{t('contact.info.hours.weekend')}</p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
          
          {/* 푸터 공간 확보 */}
          <div className="flex-shrink-0 h-16"></div>
        </div>
      </FullScreenSection>
    </>
  );
}