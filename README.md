# Wellcome

간단한 Streamlit 인사 웹앱입니다.

## 기능

- 메인 화면 중앙에 `안녕하세요` 문구와 이모티콘을 표시합니다.
- `나도 인사하기` 버튼을 누르면 축하 화면으로 이동합니다.
- 축하 화면에서 `첫 웹페이지 제작을 축하해요` 문구와 Streamlit 폭죽 효과를 표시합니다.
- `돌아가기` 버튼으로 메인 화면에 돌아갈 수 있습니다.
- 프로젝트에서 직접 작성한 CSS 색상은 OKLCH 색공간을 사용합니다.

## 설치

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements-dev.txt
```

## 테스트

```powershell
python -m pytest
python -m compileall app.py streamlit_greeting
```

## 실행

```powershell
streamlit run app.py
```

## Vercel 배포용 앱

같은 화면과 동작을 Vercel에 배포할 수 있도록 `vercel-app/`에 Next.js/TypeScript 앱을 별도로 제공합니다.

```powershell
cd vercel-app
npm install
npm run dev
```

Vercel 프로젝트 설정:

- Framework Preset: `Next.js`
- Root Directory: `vercel-app`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: 비워둠
