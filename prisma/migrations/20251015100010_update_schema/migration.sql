/*
  Warnings:

  - The `rankVariation_dataSetKick` column on the `_datasetkick` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "_datasetkick" DROP COLUMN "rankVariation_dataSetKick",
ADD COLUMN     "rankVariation_dataSetKick" INTEGER;
