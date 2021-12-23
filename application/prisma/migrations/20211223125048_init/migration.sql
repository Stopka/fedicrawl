-- CreateEnum
CREATE TYPE "FeedType" AS ENUM ('account', 'channel');

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "feedId" UUID NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedToTag" (
    "feedId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "FeedToTag_pkey" PRIMARY KEY ("feedId","tagId")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "feedId" UUID NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" UUID NOT NULL,
    "nodeId" UUID NOT NULL,
    "foundAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refreshedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "followersCount" INTEGER NOT NULL,
    "followingCount" INTEGER NOT NULL,
    "statusesCount" INTEGER,
    "bot" BOOLEAN,
    "url" TEXT NOT NULL,
    "avatar" TEXT,
    "locked" BOOLEAN NOT NULL,
    "lastStatusAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,
    "type" "FeedType" NOT NULL DEFAULT E'account',
    "parentFeedName" TEXT,
    "parentFeedDomain" TEXT,
    "fulltext" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" UUID NOT NULL,
    "softwareName" TEXT,
    "softwareVersion" TEXT,
    "totalUserCount" INTEGER,
    "monthActiveUserCount" INTEGER,
    "halfYearActiveUserCount" INTEGER,
    "statusesCount" INTEGER,
    "openRegistrations" BOOLEAN,
    "foundAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refreshedAt" TIMESTAMP(3),
    "refreshAttemptedAt" TIMESTAMP(3),
    "domain" TEXT NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Email_address_idx" ON "Email"("address");

-- CreateIndex
CREATE INDEX "Field_name_idx" ON "Field"("name");

-- CreateIndex
CREATE INDEX "Field_value_idx" ON "Field"("value");

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

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedToTag" ADD CONSTRAINT "FeedToTag_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedToTag" ADD CONSTRAINT "FeedToTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
