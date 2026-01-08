-- AlterEnum
ALTER TYPE "UserVerificationStatus" ADD VALUE 'PENDING';

-- DropForeignKey
ALTER TABLE "ImageEvent" DROP CONSTRAINT "ImageEvent_event_id_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT;

-- AlterTable
ALTER TABLE "UserVerification" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "ImageEvent" ADD CONSTRAINT "ImageEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;
