# Database Schema

Drizzle property names use camelCase in TypeScript. The strings passed to Drizzle column constructors remain the physical PostgreSQL column names.

## `apiKeys` (`apikeys` table)

- `id`, `rateLimit`, `userId`, `keyHash`, `keyPrefix`, `name`, `isActive`, `createdAt`, `lastUsedAt`, `expiresAt`

## `documents` table

- `id`, `jobId`, `recipientData`, `status`, `error`, `verifyToken`, `storageKey`, `fileName`, `createdAt`

## `jobs` table

- `id`, `jobType`, `idempotencyKey`, `userId`, `templateId`, `status`, `retryCount`, `maxRetries`, `lastError`, `failedAt`, `totalCount`, `processedCount`, `failedCount`, `zipKey`, `createdAt`, `completedAt`, `semantics`

## `placeholders` table

- `id`, `templateId`, `name`, `key`, `type`, `x`, `y`, `width`, `height`, `strategy`, `minFontSize`, `align`, `fontSize`, `fontColor`, `fontFamily`

## `templates` table

- `id`, `userId`, `name`, `storageKey`, `version`, `isActive`, `width`, `height`, `createdAt`, `updatedAt`

## `users` table

- `id`, `name`, `email`, `emailVerified`, `passwordHash`, `avatarUrl`, `createdAt`, `updatedAt`

## `sessions` table

- `id`, `userId`, `tokenHash`, `expiresAt`, `revokedAt`, `createdAt`, `lastUsedAt`, `userAgent`, `ipAddress`

## `oauthAccounts` (`oauth_accounts` table)

- `id`, `userId`, `provider`, `providerAccountId`, `email`, `createdAt`, `updatedAt`
