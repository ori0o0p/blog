---
layout: post
title: "Express로 REST API 만들기"
date: 2023-11-05
categories: [backend]
subcategory: nodejs
tags: [Node.js, Express, REST API]
---

Express는 Node.js를 위한 빠르고 간결한 웹 프레임워크로, REST API를 구축하는 데 널리 사용됩니다. 이 글에서는 Express를 사용하여 기본적인 REST API를 만드는 방법을 알아보겠습니다.

## Express 설치 및 기본 설정

먼저 새 프로젝트를 생성하고 Express를 설치합니다:

\`\`\`bash
mkdir express-api
cd express-api
npm init -y
npm install express
\`\`\`

이제 기본적인 Express 서버를 설정해 보겠습니다:

\`\`\`javascript
// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// JSON 요청 본문 파싱
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Express REST API에 오신 것을 환영합니다!' });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
});
\`\`\`

## REST API 엔드포인트 구현

이제 사용자 리소스에 대한 CRUD(Create, Read, Update, Delete) 작업을 수행하는 REST API 엔드포인트를 구현해 보겠습니다:

\`\`\`javascript
// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// JSON 요청 본문 파싱
app.use(express.json());

// 메모리 내 사용자 데이터 (실제 애플리케이션에서는 데이터베이스 사용)
let users = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' }
];

// 모든 사용자 조회 (READ)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// 특정 사용자 조회 (READ)
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다' });
  }
  
  res.json(user);
});

// 새 사용자 생성 (CREATE)
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: '이름과 이메일은 필수 항목입니다' });
  }
  
  const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  const newUser = { id: newId, name, email };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// 사용자 정보 업데이트 (UPDATE)
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: '이름과 이메일은 필수 항목입니다' });
  }
  
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다' });
  }
  
  users[userIndex] = { id, name, email };
  res.json(users[userIndex]);
});

// 사용자 삭제 (DELETE)
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다' });
  }
  
  const deletedUser = users[userIndex];
  users = users.filter(user => user.id !== id);
  
  res.json(deletedUser);
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
});
\`\`\`

## 미들웨어 사용

Express의 강력한 기능 중 하나는 미들웨어입니다. 미들웨어를 사용하여 요청 로깅, 오류 처리 등의 기능을 추가할 수 있습니다:

\`\`\`javascript
// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 오류가 발생했습니다' });
});
\`\`\`

## 라우터 분리

애플리케이션이 커지면 라우트를 별도의 파일로 분리하는 것이 좋습니다:

\`\`\`javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// 메모리 내 사용자 데이터
let users = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' }
];

// 모든 사용자 조회
router.get('/', (req, res) => {
  res.json(users);
});

// 특정 사용자 조회
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다' });
  }
  
  res.json(user);
});

// 새 사용자 생성
router.post('/', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: '이름과 이메일은 필수 항목입니다' });
  }
  
  const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  const newUser = { id: newId, name, email };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// 사용자 정보 업데이트
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: '이름과 이메일은 필수 항목입니다' });
  }
  
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다' });
  }
  
  users[userIndex] = { id, name, email };
  res.json(users[userIndex]);
});

// 사용자 삭제
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: '사용자를 찾을 수 없습니다' });
  }
  
  const deletedUser = users[userIndex];
  users = users.filter(user => user.id !== id);
  
  res.json(deletedUser);
});

module.exports = router;
\`\`\`

\`\`\`javascript
// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const usersRouter = require('./routes/users');

// JSON 요청 본문 파싱
app.use(express.json());

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 라우터 사용
app.use('/api/users', usersRouter);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Express REST API에 오신 것을 환영합니다!' });
});

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 오류가 발생했습니다' });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
});
\`\`\`

## API 테스트

API를 테스트하기 위해 Postman이나 curl 명령어를 사용할 수 있습니다:

\`\`\`bash
# 모든 사용자 조회
curl http://localhost:3000/api/users

# 특정 사용자 조회
curl http://localhost:3000/api/users/1

# 새 사용자 생성
curl -X POST -H "Content-Type: application/json" -d '{"name":"이영희","email":"lee@example.com"}' http://localhost:3000/api/users

# 사용자 정보 업데이트
curl -X PUT -H "Content-Type: application/json" -d '{"name":"이영희","email":"updated@example.com"}' http://localhost:3000/api/users/3

# 사용자 삭제
curl -X DELETE http://localhost:3000/api/users/3
\`\`\`

## 결론

이 글에서는 Express를 사용하여 기본적인 REST API를 구축하는 방법을 알아보았습니다. Express는 간결하면서도 강력한 기능을 제공하여 Node.js에서 API를 개발하는 데 이상적인 프레임워크입니다.

실제 애플리케이션에서는 MongoDB, PostgreSQL 등의 데이터베이스를 연결하고, JWT를 사용한 인증, 입력 유효성 검사 등의 기능을 추가하여 더 견고한 API를 구축할 수 있습니다.
