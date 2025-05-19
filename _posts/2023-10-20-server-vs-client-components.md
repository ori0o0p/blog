---
layout: post
title: "서버 컴포넌트 vs 클라이언트 컴포넌트"
date: 2023-10-20
categories: [frontend]
subcategory: nextjs
tags: [Next.js, React, 서버 컴포넌트]
---

Next.js 13에서 도입된 React Server Components는 웹 애플리케이션 개발 방식에 큰 변화를 가져왔습니다. 이 글에서는 서버 컴포넌트와 클라이언트 컴포넌트의 차이점과 각각의 사용 사례에 대해 알아보겠습니다.

## 서버 컴포넌트와 클라이언트 컴포넌트의 차이점

### 서버 컴포넌트

서버 컴포넌트는 서버에서 렌더링되어 HTML로 변환된 후 클라이언트로 전송됩니다. 이는 다음과 같은 특징을 가집니다:

1. **번들 크기 감소**: 서버 컴포넌트의 JavaScript 코드는 클라이언트로 전송되지 않습니다.
2. **데이터베이스 직접 접근**: 서버 환경에서 실행되므로 데이터베이스에 직접 접근할 수 있습니다.
3. **환경 변수 접근**: 서버 측 환경 변수에 안전하게 접근할 수 있습니다.
4. **캐싱**: 서버에서 렌더링 결과를 캐싱하여 성능을 향상시킬 수 있습니다.

하지만 서버 컴포넌트에서는 다음과 같은 제약이 있습니다:

1. **상태 사용 불가**: `useState`와 같은 React 훅을 사용할 수 없습니다.
2. **이벤트 핸들러 사용 불가**: `onClick`과 같은 이벤트 핸들러를 사용할 수 없습니다.
3. **브라우저 API 접근 불가**: `window`, `document` 등의 브라우저 API에 접근할 수 없습니다.

### 클라이언트 컴포넌트

클라이언트 컴포넌트는 기존의 React 컴포넌트와 동일하게 클라이언트에서 렌더링됩니다. 'use client' 지시문을 파일 상단에 추가하여 클라이언트 컴포넌트로 지정할 수 있습니다.

\`\`\`jsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}
\`\`\`

클라이언트 컴포넌트는 다음과 같은 특징을 가집니다:

1. **상태 및 효과 사용 가능**: `useState`, `useEffect` 등의 React 훅을 사용할 수 있습니다.
2. **이벤트 핸들러 사용 가능**: 사용자 상호작용을 처리할 수 있습니다.
3. **브라우저 API 접근 가능**: 브라우저 환경의 API를 사용할 수 있습니다.

## 언제 어떤 컴포넌트를 사용해야 할까?

### 서버 컴포넌트를 사용해야 할 때

1. **데이터 페칭이 필요한 경우**: 데이터베이스나 API에서 데이터를 가져와야 할 때
2. **민감한 정보에 접근해야 하는 경우**: API 키, 토큰 등의 민감한 정보를 사용해야 할 때
3. **대규모 의존성이 필요한 경우**: 클라이언트로 전송되는 JavaScript 양을 줄이고 싶을 때
4. **SEO가 중요한 정적 콘텐츠**: 검색 엔진 최적화가 필요한 정적 콘텐츠

### 클라이언트 컴포넌트를 사용해야 할 때

1. **상호작용이 필요한 경우**: 사용자 입력, 애니메이션 등의 상호작용이 필요할 때
2. **상태 관리가 필요한 경우**: 컴포넌트 내부 상태를 관리해야 할 때
3. **브라우저 API를 사용해야 하는 경우**: `localStorage`, `window` 등의 브라우저 API를 사용해야 할 때
4. **이벤트 리스너가 필요한 경우**: 클릭, 스크롤 등의 이벤트를 처리해야 할 때

## 서버 컴포넌트와 클라이언트 컴포넌트의 조합

실제 애플리케이션에서는 서버 컴포넌트와 클라이언트 컴포넌트를 적절히 조합하여 사용하는 것이 좋습니다. 다음은 그 예시입니다:

\`\`\`jsx
// app/page.tsx (서버 컴포넌트)
import { db } from '@/lib/db'
import ClientCounter from '@/components/client-counter'

export default async function Page() {
  const products = await db.products.findMany()
  
  return (
    <div>
      <h1>제품 목록</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <ClientCounter />
    </div>
  )
}
\`\`\`

\`\`\`jsx
// components/client-counter.tsx (클라이언트 컴포넌트)
'use client'

import { useState } from 'react'

export default function ClientCounter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}
\`\`\`

이 예시에서는 서버 컴포넌트에서 데이터베이스에서 제품 목록을 가져오고, 클라이언트 컴포넌트에서 카운터 기능을 구현했습니다.

## 결론

Next.js 13의 App Router에서는 서버 컴포넌트와 클라이언트 컴포넌트를 적절히 조합하여 사용하는 것이 중요합니다. 각 컴포넌트의 특성을 이해하고, 상황에 맞게 선택하여 사용하면 더 효율적인 웹 애플리케이션을 구축할 수 있습니다.
