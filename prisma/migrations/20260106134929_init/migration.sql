-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "profileImage" TEXT,
    "isFounder" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Writing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "slug" TEXT NOT NULL,
    "genre" TEXT,
    "mood" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Writing_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reflection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "writingId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Reflection_writingId_fkey" FOREIGN KEY ("writingId") REFERENCES "Writing" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reflection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "writingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Like_writingId_fkey" FOREIGN KEY ("writingId") REFERENCES "Writing" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Repost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "writingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Repost_writingId_fkey" FOREIGN KEY ("writingId") REFERENCES "Writing" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Repost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Writing_slug_key" ON "Writing"("slug");

-- CreateIndex
CREATE INDEX "Writing_authorId_idx" ON "Writing"("authorId");

-- CreateIndex
CREATE INDEX "Writing_slug_idx" ON "Writing"("slug");

-- CreateIndex
CREATE INDEX "Writing_genre_idx" ON "Writing"("genre");

-- CreateIndex
CREATE INDEX "Writing_mood_idx" ON "Writing"("mood");

-- CreateIndex
CREATE INDEX "Reflection_writingId_idx" ON "Reflection"("writingId");

-- CreateIndex
CREATE INDEX "Reflection_authorId_idx" ON "Reflection"("authorId");

-- CreateIndex
CREATE INDEX "Like_writingId_idx" ON "Like"("writingId");

-- CreateIndex
CREATE INDEX "Like_userId_idx" ON "Like"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_writingId_userId_key" ON "Like"("writingId", "userId");

-- CreateIndex
CREATE INDEX "Repost_writingId_idx" ON "Repost"("writingId");

-- CreateIndex
CREATE INDEX "Repost_userId_idx" ON "Repost"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Repost_writingId_userId_key" ON "Repost"("writingId", "userId");
