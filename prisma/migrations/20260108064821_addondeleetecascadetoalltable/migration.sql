-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_author_id_fkey";

-- DropForeignKey
ALTER TABLE "EventCategory" DROP CONSTRAINT "EventCategory_category_id_fkey";

-- DropForeignKey
ALTER TABLE "EventCategory" DROP CONSTRAINT "EventCategory_event_id_fkey";

-- DropForeignKey
ALTER TABLE "EventDislike" DROP CONSTRAINT "EventDislike_event_id_fkey";

-- DropForeignKey
ALTER TABLE "EventDislike" DROP CONSTRAINT "EventDislike_user_id_fkey";

-- DropForeignKey
ALTER TABLE "EventLike" DROP CONSTRAINT "EventLike_event_id_fkey";

-- DropForeignKey
ALTER TABLE "EventLike" DROP CONSTRAINT "EventLike_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserCategoryFollow" DROP CONSTRAINT "UserCategoryFollow_category_id_fkey";

-- DropForeignKey
ALTER TABLE "UserCategoryFollow" DROP CONSTRAINT "UserCategoryFollow_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserVerification" DROP CONSTRAINT "UserVerification_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UserVerification" ADD CONSTRAINT "UserVerification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLike" ADD CONSTRAINT "EventLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLike" ADD CONSTRAINT "EventLike_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDislike" ADD CONSTRAINT "EventDislike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDislike" ADD CONSTRAINT "EventDislike_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCategory" ADD CONSTRAINT "EventCategory_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCategory" ADD CONSTRAINT "EventCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCategoryFollow" ADD CONSTRAINT "UserCategoryFollow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCategoryFollow" ADD CONSTRAINT "UserCategoryFollow_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;
