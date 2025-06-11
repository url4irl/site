This is url4irl's site code, powered by Next.js and Directus. 

## Getting Started

### Copy and customize environment variables:

```bash
cp .env.docker .env
```

Edit `.env` file and change the default values, especially:
- `DIRECTUS_SECRET`: Use a secure random string
- `DIRECTUS_ADMIN_PASSWORD`: Set a strong password
- `DB_PASSWORD`: Use a secure database password

### Start the services:

```bash
pnpm dev
```

### Access the services:

#### Directus

- Open http://localhost:8055 in your browser
- Login with the admin credentials you set in the `.env` file
- Default: admin@example.com / admin123 (change these!)

#### Site

Open http://localhost:3000 in your browser