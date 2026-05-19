/*
  Warnings:

  - You are about to drop the `AIMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AIMessage" DROP CONSTRAINT "AIMessage_userId_fkey";

-- DropTable
DROP TABLE "AIMessage";

-- CreateTable
CREATE TABLE "aIMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aIMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "aIMessage_userId_createdAt_idx" ON "aIMessage"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "aIMessage" ADD CONSTRAINT "aIMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
