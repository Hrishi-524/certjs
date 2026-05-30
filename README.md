hrishi@DESKTOP-7I56U3F:/mnt/c/Users/HP/Desktop/Personal Projects/certjs$ tree -I "node_modules|dist|build|.next|coverage|ignore" -L 10
.
├── README.md
├── apps
│   ├── api
│   │   ├── drizzle
│   │   │   ├── 0000_bored_mercury.sql
│   │   │   ├── 0001_awesome_doomsday.sql
│   │   │   ├── 0002_left_deathstrike.sql
│   │   │   └── meta
│   │   │       ├── 0000_snapshot.json
│   │   │       ├── 0001_snapshot.json
│   │   │       ├── 0002_snapshot.json
│   │   │       └── _journal.json
│   │   ├── drizzle.config.ts
│   │   ├── notes.md
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── context.md
│   │   │   ├── controllers
│   │   │   │   ├── README.md
│   │   │   │   ├── document.controller.ts
│   │   │   │   ├── jobs.controller.ts
│   │   │   │   ├── placeholder.controller.ts
│   │   │   │   ├── templates.controller.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   └── verify.controller.ts
│   │   │   ├── index.ts
│   │   │   ├── middleware
│   │   │   │   └── upload.middleware.ts
│   │   │   ├── routes
│   │   │   │   ├── index.ts
│   │   │   │   ├── internal
│   │   │   │   │   ├── document.routes.ts
│   │   │   │   │   ├── index.router.ts
│   │   │   │   │   ├── jobs.roues.ts
│   │   │   │   │   ├── placeholder.routes.ts
│   │   │   │   │   ├── template.routes.ts
│   │   │   │   │   ├── test.routes.ts
│   │   │   │   │   └── user.routes.ts
│   │   │   │   └── public
│   │   │   │       └── index.router.ts
│   │   │   ├── services
│   │   │   │   ├── README.md
│   │   │   │   ├── jobs.service.ts
│   │   │   │   ├── placeholders.service.ts
│   │   │   │   ├── storage.service.ts
│   │   │   │   ├── templates.service.ts
│   │   │   │   └── types.ts
│   │   │   ├── test
│   │   │   │   ├── Response-1773938760179.http
│   │   │   │   ├── api.http
│   │   │   │   ├── templates.api.http
│   │   │   │   ├── test-job-service.ts
│   │   │   │   ├── test-render.ts
│   │   │   │   └── users.api.http
│   │   │   ├── utils
│   │   │   │   └── wrapAsync.ts
│   │   │   └── validations
│   │   │       └── jobs.validations.ts
│   │   └── tsconfig.json
│   └── worker
│       ├── create-zip.ts
│       ├── fetch-template-buffer.ts
│       ├── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── upload-rendered-document.ts
├── package-lock.json
├── package.json
├── packages
│   ├── core
│   │   ├── debug
│   │   │   └── overlay.ts
│   │   ├── inputs
│   │   │   ├── head_and_mentor.png
│   │   │   ├── signature.png
│   │   │   └── template.png
│   │   ├── outputs
│   │   │   └── output.png
│   │   ├── package.json
│   │   ├── render-engine.ts
│   │   ├── strategies
│   │   │   ├── ellipsis.ts
│   │   │   ├── index.ts
│   │   │   ├── shrink-to-fit.ts
│   │   │   └── warp-text.ts
│   │   ├── test-render-engine.ts
│   │   ├── tsconfig.json
│   │   ├── types.ts
│   │   └── utils
│   │       ├── escapeXml.ts
│   │       └── measureWidth.ts
│   ├── db
│   │   ├── docs
│   │   │   └── schema-definations.md
│   │   ├── index.ts
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── schema
│   │   │   ├── api_keys.ts
│   │   │   ├── documents.ts
│   │   │   ├── enum.ts
│   │   │   ├── index.ts
│   │   │   ├── jobs.ts
│   │   │   ├── placeholders.ts
│   │   │   ├── templates.ts
│   │   │   └── users.ts
│   │   └── tsconfig.json
│   └── queue
│       ├── index.ts
│       ├── package.json
│       └── tsconfig.json
└── tsconfig.base.json

27 directories, 88 files