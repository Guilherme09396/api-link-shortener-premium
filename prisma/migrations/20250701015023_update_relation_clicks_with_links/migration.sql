-- DropForeignKey
ALTER TABLE "clicks_in_link" DROP CONSTRAINT "clicks_in_link_link_id_fkey";

-- AddForeignKey
ALTER TABLE "clicks_in_link" ADD CONSTRAINT "clicks_in_link_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;
