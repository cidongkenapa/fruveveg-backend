/*
  Warnings:

  - Made the column `address` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `payment` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cancelAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "payment" SET NOT NULL;
