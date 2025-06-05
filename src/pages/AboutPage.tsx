import React from 'react';

const AboutPage = () => {
  return (
    <div className="about">
      <h1 className="page-heading">소개</h1>
      
      <div className="about-content">
        <p>
          안녕하세요! 블로그에 오신 것을 환영합니다. <br/>
          이 블로그는 <a href="https://github.com/ori0o0p" target="_blank" rel="noopener noreferrer">@ori0o0p</a>이 공부했던 내용을 정리하는 공간입니다.
        </p>
        
        <h2>블로그 주요 내용</h2>
        <ul>
          <li>백엔드 개발</li>
          <li>데이터베이스 설계 및 전략</li>
          <li>개발 언어</li>
        </ul>
        
        <h2>오류를 발견하면 어떻게 하나요?</h2>
        <p>
          저는 한국어가 서툴고 철자 실수가 잦습니다. <br/>
          학습 과정에서 오류나 의심 사항을 발견하시면 아래와 같은 방법으로 피드백 주시길 바랍니다.
        </p>
        <ul>
          <li>이메일: <a href="mailto:tmddnjsrla99@gmail.com">tmddnjsrla99@gmail.com</a></li>
          <li>GitHub: <a href="https://github.com/ori0o0p" target="_blank" rel="noopener noreferrer">github.com/ori0o0p</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/ori0o0p" target="_blank" rel="noopener noreferrer">linkedin.com/ori0o0p</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;