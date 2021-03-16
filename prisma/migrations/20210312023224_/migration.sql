-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Location" ADD FOREIGN KEY ("ownerId") REFERENCES "BucketListItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
