# Wellcome

Vercel에 바로 배포할 수 있는 Next.js/TypeScript 인사 웹앱입니다. 기존 Streamlit 버전은 `streamlit-app/` 폴더에 보존되어 있습니다.

## Vercel 앱

### 기능

- 메인 화면 중앙에 `안녕하세요` 문구와 이모티콘을 표시합니다.
- `나도 인사하기` 버튼을 누르면 축하 화면으로 이동합니다.
- 축하 화면에서 `첫 웹페이지 제작을 축하해요` 문구와 CSS 폭죽 효과를 표시합니다.
- `돌아가기` 버튼으로 메인 화면에 돌아갈 수 있습니다.
- 프로젝트에서 직접 작성한 CSS 색상은 OKLCH 색공간을 사용합니다.

### 로컬 실행

```powershell
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

### 검증

```powershell
npm run lint
npm run build
npm audit --audit-level=moderate
```

### Vercel 설정

루트 디렉터리 변경 없이 기본값으로 배포합니다.

- Framework Preset: `Next.js`
- Root Directory: 비워둠 또는 기본값 유지
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: 비워둠

## Streamlit 앱

Python/Streamlit 버전은 `streamlit-app/`에서 실행합니다.

```powershell
cd streamlit-app
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements-dev.txt
python -m pytest
python -m compileall app.py streamlit_greeting
streamlit run app.py
```
