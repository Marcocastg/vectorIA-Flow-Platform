-- CreateTable
CREATE TABLE "_platform" (
    "uuid_Platform" TEXT NOT NULL,
    "name_Platform" TEXT,
    "url_Platform" TEXT,
    "logoUrl_Platform" TEXT,

    CONSTRAINT "_platform_pkey" PRIMARY KEY ("uuid_Platform")
);

-- CreateTable
CREATE TABLE "_user" (
    "uuid_User" TEXT NOT NULL,
    "firstName_User" TEXT,
    "lastName_User" TEXT,
    "password_User" TEXT NOT NULL,
    "email_User" TEXT NOT NULL,
    "companyName_User" TEXT,

    CONSTRAINT "_user_pkey" PRIMARY KEY ("uuid_User")
);

-- CreateTable
CREATE TABLE "_category" (
    "uuid_Category" TEXT NOT NULL,
    "name_Category" TEXT,
    "currentViewers_Category" INTEGER,
    "Platform_uuid_Platform" TEXT NOT NULL,

    CONSTRAINT "_category_pkey" PRIMARY KEY ("uuid_Category")
);

-- CreateTable
CREATE TABLE "_channel" (
    "uuid_Channel" TEXT NOT NULL,
    "name_Channel" TEXT,
    "followers_Channel" INTEGER,
    "lastSeenAt_Channel" TEXT,
    "description_Channel" TEXT,
    "Platform_uuid_Platform" TEXT NOT NULL,

    CONSTRAINT "_channel_pkey" PRIMARY KEY ("uuid_Channel")
);

-- CreateTable
CREATE TABLE "_analysis" (
    "uuid_Analysis" TEXT NOT NULL,
    "title_Analysis" TEXT,
    "User_uuid_User" TEXT NOT NULL,
    "Channel_uuid_Channel" TEXT NOT NULL,

    CONSTRAINT "_analysis_pkey" PRIMARY KEY ("uuid_Analysis")
);

-- CreateTable
CREATE TABLE "_livestream" (
    "uuid_Livestream" TEXT NOT NULL,
    "title_Livestream" TEXT,
    "thumbnailUrl_Livestream" TEXT,
    "language_Livestream" TEXT,
    "startedAt_Livestream" TEXT,
    "currentViewers_Livestream" INTEGER,
    "matureContent_Livestream" BOOLEAN,
    "Channel_uuid_Channel" TEXT NOT NULL,
    "Category_uuid_Category" TEXT NOT NULL,

    CONSTRAINT "_livestream_pkey" PRIMARY KEY ("uuid_Livestream")
);

-- CreateTable
CREATE TABLE "_videoondemand" (
    "uuid_VOD" TEXT NOT NULL,
    "title_VOD" TEXT,
    "duration_VOD" INTEGER,
    "views_VOD" INTEGER,
    "matureContent_VOD" BOOLEAN,
    "Channel_uuid_Channel" TEXT NOT NULL,

    CONSTRAINT "_videoondemand_pkey" PRIMARY KEY ("uuid_VOD")
);

-- CreateTable
CREATE TABLE "_dataset" (
    "uuid_dataSet" TEXT NOT NULL,
    "channelName_dataSet" TEXT,
    "averageViewers_dataSet" INTEGER,
    "hoursWatched_dataSet" INTEGER,
    "maxViewers_dataSet" INTEGER,
    "minutesStreamed_dataSet" INTEGER,
    "followersGained_dataSet" INTEGER,
    "totalFollowers_dataSet" INTEGER,
    "rank_dataSet" INTEGER,
    "fechaRegistro_dataSet" TEXT,

    CONSTRAINT "_dataset_pkey" PRIMARY KEY ("uuid_dataSet")
);

-- CreateTable
CREATE TABLE "_datasetkick" (
    "uuid_dataSetKick" TEXT NOT NULL,
    "channelName_dataSetKick" TEXT,
    "channelPfp_dataSetKick" TEXT,
    "rank_dataSetKick" INTEGER,
    "averageViewers_dataSetKick" INTEGER,
    "hoursWatched_dataSetKick" INTEGER,
    "maxViewers_dataSetKick" INTEGER,
    "hoursStreamed_dataSetKick" INTEGER,
    "totalFollowers_dataSetKick" INTEGER,
    "language_dataSetKick" TEXT,
    "rankVariation_dataSetKick" TEXT,
    "fechaRegistro_dataSetKick" TEXT,

    CONSTRAINT "_datasetkick_pkey" PRIMARY KEY ("uuid_dataSetKick")
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_email_User_key" ON "_user"("email_User");

-- AddForeignKey
ALTER TABLE "_category" ADD CONSTRAINT "_category_Platform_uuid_Platform_fkey" FOREIGN KEY ("Platform_uuid_Platform") REFERENCES "_platform"("uuid_Platform") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channel" ADD CONSTRAINT "_channel_Platform_uuid_Platform_fkey" FOREIGN KEY ("Platform_uuid_Platform") REFERENCES "_platform"("uuid_Platform") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_analysis" ADD CONSTRAINT "_analysis_User_uuid_User_fkey" FOREIGN KEY ("User_uuid_User") REFERENCES "_user"("uuid_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_analysis" ADD CONSTRAINT "_analysis_Channel_uuid_Channel_fkey" FOREIGN KEY ("Channel_uuid_Channel") REFERENCES "_channel"("uuid_Channel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_livestream" ADD CONSTRAINT "_livestream_Channel_uuid_Channel_fkey" FOREIGN KEY ("Channel_uuid_Channel") REFERENCES "_channel"("uuid_Channel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_livestream" ADD CONSTRAINT "_livestream_Category_uuid_Category_fkey" FOREIGN KEY ("Category_uuid_Category") REFERENCES "_category"("uuid_Category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_videoondemand" ADD CONSTRAINT "_videoondemand_Channel_uuid_Channel_fkey" FOREIGN KEY ("Channel_uuid_Channel") REFERENCES "_channel"("uuid_Channel") ON DELETE RESTRICT ON UPDATE CASCADE;
