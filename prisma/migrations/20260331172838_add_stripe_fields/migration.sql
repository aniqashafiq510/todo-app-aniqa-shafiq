/*
  Warnings:

  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_stripeSubscriptionId_key" ON "user"("stripeSubscriptionId");
