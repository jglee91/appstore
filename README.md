# appstore
MERN stack appstore

## TODO
- [] Setup Server
- [] DB Schema Modeling
- [] Add routers
  - [] company
  - [] project
  - [] application
- [] Setup Client

## 기능정의
- [] 로그인(사원, 고객사 분리)
- [] 고객사, 프로젝트, 어플리케이션 CRUD + Setting Enabled
- [] 단말기 CRUD + Rent Action
- [] (iOS) push 인증서 관리
- [] (AOS, iOS) push 테스트 기능
- [] iOS 인증서 만료메일 발송(To 서비스운영팀)

## 스키마
- Company
  - 고객사
- Project
  - 프로젝트
  - 고객사 child
- Application
  - 어플리케이션
  - 프로젝트 child
- Device
  - 단말기
- IOSCertification
  - (iOS) 인증서