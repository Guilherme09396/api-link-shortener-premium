-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "customSlug" TEXT,
    "expireAt" TIMESTAMP(3),
    "password" TEXT,
    "private" BOOLEAN,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);
