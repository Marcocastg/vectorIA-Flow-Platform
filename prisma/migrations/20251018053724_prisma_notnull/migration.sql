-- AlterTable
ALTER TABLE "_dataset" ADD COLUMN     "Channel_uuid_Channel" TEXT;

-- AddForeignKey
ALTER TABLE "_dataset" ADD CONSTRAINT "_dataset_Channel_uuid_Channel_fkey" FOREIGN KEY ("Channel_uuid_Channel") REFERENCES "_channel"("uuid_Channel") ON DELETE SET NULL ON UPDATE CASCADE;
