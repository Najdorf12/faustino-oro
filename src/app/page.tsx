export default function Home() {
  return <section className="bg-zinc-800 h-screen w-full"></section>;
}

/* project-root/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── tournaments/
│   │   │   ├── route.ts              # GET (list), POST (create)
│   │   │   └── [id]/route.ts         # GET, PUT, DELETE (by id)
│   │   ├── notices/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── stats/
│   │   └── logros/
│   ├── admin/
│   │   ├── layout.tsx                # Layout compartido del admin
│   │   ├── page.tsx                  # Dashboard principal
│   │   ├── tournaments/
│   │   │   ├── page.tsx              # Lista de torneos
│   │   │   ├── new/page.tsx          # Crear torneo
│   │   │   └── [id]/edit/page.tsx    # Editar torneo
│   │   ├── notices/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── stats/
│   │   └── logros/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── (public)/                     # Rutas públicas
│       ├── page.tsx
│       └── ...
├── lib/
│   ├── mongodb.ts                    # Conexión a BD
│   ├── validations/                  # Schemas de validación (Zod)
│   │   ├── tournament.ts
│   │   ├── notice.ts
│   │   └── ...
│   └── utils.ts
├── models/                           # Mongoose models
│   ├── user.ts
│   ├── tournament.ts
│   ├── notice.ts
│   ├── stat.ts
│   └── logro.ts
├── services/                         # Lógica de negocio (tu "Controlador")
│   ├── tournamentService.ts
│   ├── noticeService.ts
│   ├── statService.ts
│   └── logroService.ts
├── components/
│   ├── ui/                          # Componentes reutilizables
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── TournamentForm.tsx
│   │   ├── NoticeForm.tsx
│   │   └── ...
│   └── LogoutButton.tsx
├── types/
│   ├── tournament.ts
│   ├── notice.ts
│   └── ...
└── middleware.ts */
