# SPark - What Ignites SP

A college committee website showcasing creative content (photography and reports) from campus events, featuring member profiles and administrative tools.

## 🚀 Features

- **Event Coverage**: Browse and search events by committee, date, and domain
- **Photo Galleries**: High-quality image galleries from college events
- **Member Profiles**: Detailed profiles of photographers, reporters, and writers
- **Admin Dashboard**: Content management and internal reporting
- **Search & Filter**: Advanced filtering by committee, month, and category

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Content Storage**: Google Drive API integration

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create `.env.local`):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/spark"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google Drive API
GOOGLE_DRIVE_CLIENT_ID="your-client-id"
GOOGLE_DRIVE_CLIENT_SECRET="your-client-secret"
GOOGLE_DRIVE_REFRESH_TOKEN="your-refresh-token"
```

4. Initialize the database:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
SPark/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public-facing pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── lib/                   # Utility functions
├── prisma/                # Database schema
├── public/                # Static assets
└── types/                 # TypeScript types
```

## 🔐 Default Admin Credentials

- **Email**: admin@spark.com
- **Password**: admin123

*Please change these credentials after first login!*

## 📖 Documentation

For detailed documentation, see:
- [Architecture](docs/ARCHITECTURE.md)
- [Database Schema](docs/SCHEMA.md)
- [User Flow](docs/USER_FLOW.md)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License.
