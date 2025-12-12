# Roadmap Node.js — _From Logic to Production Engineering_

## LEVEL 1 — JAVASCRIPT FOR NODE RUNTIME (Fundamental Logika Asinkron)

> Tujuan: Memahami bahasa JavaScript dari sisi **runtime Node.js**, bukan browser.

### Materi:

- Konsep _single-threaded + event-driven_ (Non-blocking I/O) _done ✓_
- V8 Engine dan memory heap _done ✓_
- Event Loop, Task Queue, dan Microtask Queue _done ✓_
- Asynchronous JS: Callback → Promise → Async/Await _done ✓_
- Error Handling: `try...catch`, `throw`, `process.on('uncaughtException')` _done ✓_
- Modularization: CommonJS (`require`) vs ES Modules (`import/export`) _done ✓_

**Sumber:**

- [Node.js Event Loop Docs](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Jake Archibald - Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

---

## LEVEL 2 — CORE NODE.JS MODULES & SYSTEM UNDERSTANDING

> Tujuan: Memahami bagaimana Node.js menjalankan server dan berinteraksi dengan OS.

### Materi:

- Built-in Modules: `fs`, `path`, `os`, `http`, `events` _done ✓_
- Environment Variable & `process.env` _done ✓_
- Membuat HTTP server manual (`http.createServer()`) _done ✓_
- Konsep _stream_ dan _buffer_ _done ✓_
- File I/O asynchronous (`fs.promises`) _done ✓_
- Struktur project modular (tanpa Express) _done ✓_
- Debugging dasar dengan `node --inspect` dan Chrome DevTools _done ✓_

**Sumber:**

- [Node.js API Docs](https://nodejs.org/api/)
- [Stream Handbook by Substack](https://github.com/substack/stream-handbook)

---

## LEVEL 3 — HTTP FRAMEWORK: EXPRESS

> Tujuan: Menyederhanakan logika HTTP dan middleware system.

### Materi:

- Arsitektur Express & Middleware Flow _done ✓_
- Routing dasar (GET, POST, PUT, DELETE) _done ✓_
- Custom Middleware _done ✓_
- Error Handling middleware _done ✓_
- Static file & Template Engine _done ✓_
- Modularisasi project (Routes, Controllers, Services, Utils) _done ✓_
- Logging dengan `morgan` _done ✓_
- Testing endpoint pakai Postman _done ✓_

**Sumber:**

- [Express.js Guide](https://expressjs.com/)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)

---

## LEVEL 4 — DATABASE & DATA INTEGRITY

> Tujuan: Memahami konsep data consistency dan implementasi database modern.

### Materi:

- SQL vs NoSQL (ACID vs BASE) _done ✓_
- Data Modeling: Entity Relationship & Document Structure _done ✓_
- CRUD menggunakan Mongoose (MongoDB) _done ✓_
- Query, Populate, dan Projection _done ✓_
- Validation & Sanitization (`Joi`, `validator`) _done ✓_
- Error Handling database _done ✓_
- Transaction & Race Condition _done ✓_
- Indexing dan Query Optimization (pengantar)

**Sumber:**

- [MongoDB Transactions](https://www.mongodb.com/docs/manual/core/transactions/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## LEVEL 5 — AUTHENTICATION & SECURITY

> Tujuan: Membangun sistem otentikasi yang aman dan scalable.

### Materi:

- Hash password dengan `bcrypt`
- JWT Auth + Refresh Token Flow
- Authorization (Role-based Access)
- CORS, Helmet, Rate Limiting
- SQL Injection & XSS prevention
- Secure Config & Environment
- Session vs Stateless Auth

**Sumber:**

- [OWASP NodeGoat](https://owasp.org/www-project-nodegoat/)
- [JWT.io Guide](https://jwt.io/introduction)

---

## LEVEL 6 — SOFTWARE ARCHITECTURE & ADVANCED CONCEPTS

> Tujuan: Merancang kode yang bisa tumbuh dan dipelihara, bukan proyek skripsi.

### Materi:

- MVC vs Service Layer Pattern
- Clean Architecture & Dependency Injection
- File Upload (`multer`)
- Caching dengan Redis
- Unit Testing (Jest / Mocha / Supertest)
- Logging dengan Winston
- Cluster, Load Balancing, dan Scaling

**Sumber:**

- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Redis.io Docs](https://redis.io/docs/)

---

## LEVEL 7 — DEPLOYMENT, PROFILING & MONITORING

> Tujuan: Membuat sistem yang siap produksi, efisien, dan terukur.

### Materi:

- Environment Management (dev, staging, prod)
- Deployment:

  - Platform gratis (Render, Railway)
  - VPS: PM2 + Nginx

- Profiling: `node --inspect`, CPU/Heap snapshot
- Error & Performance Monitoring (Sentry, PM2 logs)
- CI/CD (GitHub Actions)
- API Documentation (Swagger / Postman Collection)

**Sumber:**

- [Node.js Profiling Guide](https://nodejs.org/en/docs/guides/simple-profiling/)
- [PM2 Docs](https://pm2.keymetrics.io/docs/usage/quick-start/)

---

## LEVEL 8 — SYSTEM SCALE & INTEGRATION

> Tujuan: Berpikir dalam konteks sistem besar, bukan sekadar API tunggal.

### Materi:

- Design REST API Scalable (Pagination, Filtering, Sorting)
- API Gateway & Versioning
- Realtime Communication (Socket.io)
- GraphQL Basics
- Message Queue (RabbitMQ / Kafka)
- Event-driven Architecture
- Refactoring reusable modules
- Monorepo & Microservices (intro)

**Sumber:**

- [Node.js at Scale - RisingStack](https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/)
- [Kafka Architecture Overview](https://kafka.apache.org/documentation/#design)

---

## HASIL AKHIR

Mampu:

- Membangun REST API Production-ready
- Merancang sistem modular dan scalable
- Memahami cara kerja runtime, bukan cuma framework
- Melakukan profiling & deployment di dunia nyata
- Siap jadi **Backend Engineer yang berpikir sistematis, bukan tukang CRUD**
