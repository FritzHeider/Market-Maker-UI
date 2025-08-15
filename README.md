# Market Maker UI

Full-stack project for an AI-enhanced crypto market-making platform. The frontend is built with Next.js and TailwindCSS, while the backend uses FastAPI.

## Features

- Real-time trading dashboard with charts, ticker, and strategy controls
- Engaging landing page with hero call-to-action and newsletter signup
- Modular architecture for easy extension
- Dark/light theme toggle and accessible footer
- Pricing, AI optimizer and referral pages

## Project Structure

- `api/` – FastAPI backend services
- `ui/` – Next.js frontend application

## Getting Started

### Frontend

```bash
cd ui
npm install
npm run dev
```

#### Production build

```bash
npm run build
npm start
```

### Backend

```bash
cd api
pip install -r requirements.txt
uvicorn src.main:app --reload
```

### Docker

Build and run the UI in a container:

```bash
docker build -t market-maker-ui .
docker run -p 3000:3000 market-maker-ui
```

## License

MIT
