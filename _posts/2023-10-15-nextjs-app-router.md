---
layout: post
title: "Next.js 13 App Router 소개"
date: 2023-10-15
categories: [frontend]
subcategory: nextjs
tags: [Next.js, React, 프론트엔드]
---

Next.js 13에서 소개된 App Router는 React의 최신 기능을 활용하여 더 나은 개발자 경험과 성능을 제공합니다. 이 글에서는 App Router의 주요 기능과 장점에 대해 알아보겠습니다.

## App Router란?

App Router는 Next.js의 새로운 라우팅 시스템으로, 기존의 Pages Router를 대체합니다. App Router는 React Server Components를 기반으로 하며, 파일 시스템 기반 라우팅을 사용합니다.

## 주요 기능

### 1. 서버 컴포넌트

App Router는 기본적으로 모든 컴포넌트를 서버 컴포넌트로 취급합니다. 서버 컴포넌트는 서버에서 렌더링되어 클라이언트로 전송되므로, 클라이언트 측 JavaScript 번들 크기를 줄일 수 있습니다.

\`\`\`jsx
// app/page.tsx
// 이 컴포넌트는 기본적으로 서버 컴포넌트입니다
export default function Page() {
  return <h1>안녕하세요, Next.js!</h1>
}
\`\`\`

### 2. 클라이언트 컴포넌트

클라이언트 측 상호작용이 필요한 경우, 'use client' 지시문을 사용하여 클라이언트 컴포넌트를 만들 수 있습니다.

\`\`\`jsx
// components/counter.tsx
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

### 3. 레이아웃

App Router는 중첩된 레이아웃을 쉽게 구현할 수 있게 해줍니다. layout.tsx 파일을 사용하여 여러 페이지에서 공유되는 UI 요소를 정의할 수 있습니다.

\`\`\`jsx
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav>블로그 네비게이션</nav>
      <main>{children}</main>
      <footer>블로그 푸터</footer>
    </div>
  )
}
\`\`\`

### 4. 데이터 페칭

서버 컴포넌트에서는 async/await를 사용하여 데이터를 가져올 수 있습니다. 이는 클라이언트 측 JavaScript 없이도 데이터를 가져올 수 있게 해줍니다.

\`\`\`jsx
// app/posts/[id]/page.tsx
async function getPost(id) {
  const res = await fetch(`https://api.example.com/posts/${id}`)
  return res.json()
}

export default async function Post({ params }) {
  const post = await getPost(params.id)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
\`\`\`

## 결론

Next.js 13의 App Router는 React의 최신 기능을 활용하여 더 나은 개발자 경험과 성능을 제공합니다. 서버 컴포넌트, 중첩 레이아웃, 간소화된 데이터 페칭 등의 기능을 통해 더 효율적인 웹 애플리케이션을 구축할 수 있습니다.

다음 글에서는 서버 컴포넌트와 클라이언트 컴포넌트의 차이점과 각각의 사용 사례에 대해 더 자세히 알아보겠습니다.
