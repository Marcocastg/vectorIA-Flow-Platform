-- AlterTable
ALTER TABLE "_datasetkick" ADD COLUMN     "Channel_uuid_Channel" TEXT;

-- AddForeignKey
ALTER TABLE "_datasetkick" ADD CONSTRAINT "_datasetkick_Channel_uuid_Channel_fkey" FOREIGN KEY ("Channel_uuid_Channel") REFERENCES "_channel"("uuid_Channel") ON DELETE SET NULL ON UPDATE CASCADE;
