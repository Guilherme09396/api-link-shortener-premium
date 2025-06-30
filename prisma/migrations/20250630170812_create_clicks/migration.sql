-- CreateTable
CREATE TABLE "clicks_in_link" (
    "id" TEXT NOT NULL,
    "ip" TEXT,
    "user_agent" TEXT,
    "date_of_access" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lon" INTEGER,
    "lat" INTEGER,
    "link_id" TEXT NOT NULL,

    CONSTRAINT "clicks_in_link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clicks_in_link" ADD CONSTRAINT "clicks_in_link_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
