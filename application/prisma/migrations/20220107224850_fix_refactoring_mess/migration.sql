/*
  Warnings:

  - A unique constraint covering the columns `[name,nodeId]` on the table `Feed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[domain]` on the table `Node` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Email_address_idx";

-- DropIndex
DROP INDEX "Feed_bot_idx";

-- DropIndex
DROP INDEX "Feed_createdAt_idx";

-- DropIndex
DROP INDEX "Feed_description_idx";

-- DropIndex
DROP INDEX "Feed_displayName_idx";

-- DropIndex
DROP INDEX "Feed_fulltext_idx";

-- DropIndex
DROP INDEX "Feed_lastStatusAt_idx";

-- DropIndex
DROP INDEX "Feed_locked_idx";

-- DropIndex
DROP INDEX "Feed_name_nodeId_key";

-- DropIndex
DROP INDEX "Feed_parentFeedName_parentFeedDomain_idx";

-- DropIndex
DROP INDEX "Feed_refreshedAt_idx";

-- DropIndex
DROP INDEX "Feed_type_idx";

-- DropIndex
DROP INDEX "Field_name_idx";

-- DropIndex
DROP INDEX "Field_value_idx";

-- DropIndex
DROP INDEX "Node_domain_key";

-- DropIndex
DROP INDEX "Node_foundAt_idx";

-- DropIndex
DROP INDEX "Node_halfYearActiveUserCount_idx";

-- DropIndex
DROP INDEX "Node_monthActiveUserCount_idx";

-- DropIndex
DROP INDEX "Node_openRegistrations_idx";

-- DropIndex
DROP INDEX "Node_refreshAttemptedAt_idx";

-- DropIndex
DROP INDEX "Node_refreshedAt_idx";

-- DropIndex
DROP INDEX "Node_softwareName_idx";

-- DropIndex
DROP INDEX "Node_softwareVersion_idx";

-- DropIndex
DROP INDEX "Node_statusesCount_idx";

-- DropIndex
DROP INDEX "Node_totalUserCount_idx";

-- DropIndex
DROP INDEX "Tag_name_key";

-- CreateIndex
CREATE INDEX "Email_address_idx" ON "Email"("address");

-- CreateIndex
CREATE INDEX "Feed_displayName_idx" ON "Feed"("displayName");

-- CreateIndex
CREATE INDEX "Feed_description_idx" ON "Feed"("description");

-- CreateIndex
CREATE INDEX "Feed_bot_idx" ON "Feed"("bot");

-- CreateIndex
CREATE INDEX "Feed_locked_idx" ON "Feed"("locked");

-- CreateIndex
CREATE INDEX "Feed_lastStatusAt_idx" ON "Feed"("lastStatusAt");

-- CreateIndex
CREATE INDEX "Feed_createdAt_idx" ON "Feed"("createdAt");

-- CreateIndex
CREATE INDEX "Feed_refreshedAt_idx" ON "Feed"("refreshedAt");

-- CreateIndex
CREATE INDEX "Feed_parentFeedName_parentFeedDomain_idx" ON "Feed"("parentFeedName", "parentFeedDomain");

-- CreateIndex
CREATE INDEX "Feed_type_idx" ON "Feed"("type");

-- CreateIndex
CREATE INDEX "Feed_fulltext_idx" ON "Feed"("fulltext");

-- CreateIndex
CREATE UNIQUE INDEX "Feed_name_nodeId_key" ON "Feed"("name", "nodeId");

-- CreateIndex
CREATE INDEX "Field_name_idx" ON "Field"("name");

-- CreateIndex
CREATE INDEX "Field_value_idx" ON "Field"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Node_domain_key" ON "Node"("domain");

-- CreateIndex
CREATE INDEX "Node_softwareName_idx" ON "Node"("softwareName");

-- CreateIndex
CREATE INDEX "Node_softwareVersion_idx" ON "Node"("softwareVersion");

-- CreateIndex
CREATE INDEX "Node_totalUserCount_idx" ON "Node"("totalUserCount");

-- CreateIndex
CREATE INDEX "Node_monthActiveUserCount_idx" ON "Node"("monthActiveUserCount");

-- CreateIndex
CREATE INDEX "Node_halfYearActiveUserCount_idx" ON "Node"("halfYearActiveUserCount");

-- CreateIndex
CREATE INDEX "Node_statusesCount_idx" ON "Node"("statusesCount");

-- CreateIndex
CREATE INDEX "Node_openRegistrations_idx" ON "Node"("openRegistrations");

-- CreateIndex
CREATE INDEX "Node_refreshedAt_idx" ON "Node"("refreshedAt");

-- CreateIndex
CREATE INDEX "Node_refreshAttemptedAt_idx" ON "Node"("refreshAttemptedAt");

-- CreateIndex
CREATE INDEX "Node_foundAt_idx" ON "Node"("foundAt");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
