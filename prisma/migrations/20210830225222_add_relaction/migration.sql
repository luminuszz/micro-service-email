/*
  Warnings:

  - Added the required column `authorId` to the `email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "email" ADD FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
