/*
  Warnings:

  - You are about to drop the `aIMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "aIMessage" DROP CONSTRAINT "aIMessage_userId_fkey";

-- DropTable
DROP TABLE "aIMessage";

-- CreateTable
CREATE TABLE "aimessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aimessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "aimessage_userId_createdAt_idx" ON "aimessage"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "aimessage" ADD CONSTRAINT "aimessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
