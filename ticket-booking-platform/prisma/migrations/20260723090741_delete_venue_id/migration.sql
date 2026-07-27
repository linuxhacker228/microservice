/*
  Warnings:

  - You are about to drop the column `venueId` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `venueName` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_venueId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "venueId",
ADD COLUMN     "venueName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");
