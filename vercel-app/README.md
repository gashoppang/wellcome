# Wellcome Vercel App

Vercel에 배포할 수 있는 Next.js/TypeScript 버전의 인사 웹앱입니다.

## 기능

- 메인 화면 중앙에 `안녕하세요` 문구와 이모티콘을 표시합니다.
- `나도 인사하기` 버튼을 누르면 축하 화면으로 전환합니다.
- 축하 화면에서 `첫 웹페이지 제작을 축하해요` 문구와 CSS 폭죽 효과를 표시합니다.
- `돌아가기` 버튼으로 메인 화면에 돌아갈 수 있습니다.
- 프로젝트에서 직접 작성한 CSS 색상은 OKLCH 색공간을 사용합니다.

## 로컬 실행

```powershell
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 검증

```powershell
npm run lint
npm run build
```

## Vercel 배포

Vercel에서 새 프로젝트를 만들 때 다음처럼 설정합니다.

- Framework Preset: `Next.js`
- Root Directory: `vercel-app`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: 비워둠

GitHub 저장소를 연결하면 이후 `vercel-app/` 변경사항이 배포 대상이 됩니다.
