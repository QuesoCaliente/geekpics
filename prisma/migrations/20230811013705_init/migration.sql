-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnWaifus" DROP CONSTRAINT "UsersOnWaifus_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnWaifus" DROP CONSTRAINT "UsersOnWaifus_waifuId_fkey";

-- DropForeignKey
ALTER TABLE "Waifus" DROP CONSTRAINT "Waifus_animeId_fkey";

-- DropForeignKey
ALTER TABLE "Waifus" DROP CONSTRAINT "Waifus_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Waifus" DROP CONSTRAINT "Waifus_createdById_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Waifus" ADD CONSTRAINT "Waifus_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waifus" ADD CONSTRAINT "Waifus_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waifus" ADD CONSTRAINT "Waifus_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnWaifus" ADD CONSTRAINT "UsersOnWaifus_waifuId_fkey" FOREIGN KEY ("waifuId") REFERENCES "Waifus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnWaifus" ADD CONSTRAINT "UsersOnWaifus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
