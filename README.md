# Technology Pillars - Under Construction

This is the under construction page for Technology Pillars company website built with Next.js 15, Docker, and shadcn/ui.

## Project Structure

```
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── hero-ascii-one.tsx
├── lib/
│   └── utils.ts
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Getting Started

### Development Mode

#### Using npm:
```bash
npm install
npm run dev
```

#### Using Docker Compose (development profile):
```bash
docker-compose --profile dev up
```

The application will be available at `http://localhost:3000`

### Production Mode

#### Build and run with Docker Compose:
```bash
docker-compose up --build
```

The application will be served through Traefik proxy with:
- HTTP on port 80
- HTTPS on port 443 (with automatic SSL certificate from Let's Encrypt)
- Traefik dashboard on port 8080

## Docker Configuration

The project includes:
- **Dockerfile**: Optimized multi-stage build for production
- **docker-compose.yml**: Services configuration including:
  - `traefik`: Reverse proxy with SSL/TLS support
  - `web`: Production Next.js application
  - `dev`: Development service (requires `--profile dev`)

## Traefik Configuration

Update the domain names in `docker-compose.yml` under the `web` service labels:
- Replace `technologypillars.com` with your actual domain
- Update the email in Traefik ACME configuration for SSL certificates

## Environment Variables

Create a `.env.local` file for local environment variables:
```bash
# Add your environment variables here
```

## Technologies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Docker
- Traefik

## Production Deployment

For detailed production deployment instructions with SSL setup, see [DEPLOYMENT.md](./DEPLOYMENT.md).

Quick steps:
1. Update domain in `docker-compose.yml`
2. Create `letsencrypt` directory on server
3. Run `docker-compose up --build -d`

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
