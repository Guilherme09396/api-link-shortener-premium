/*
  Warnings:

  - A unique constraint covering the columns `[customSlug]` on the table `links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "links_customSlug_key" ON "links"("customSlug");
