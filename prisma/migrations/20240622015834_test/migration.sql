/*
  Warnings:

  - The primary key for the `Character` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CharacterSpells` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CharacterSpells` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `UserCharacters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `characterId` on the `CharacterSpells` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CharacterSpells" DROP CONSTRAINT "CharacterSpells_characterId_fkey";

-- DropForeignKey
ALTER TABLE "UserCharacters" DROP CONSTRAINT "UserCharacters_characterId_fkey";

-- DropForeignKey
ALTER TABLE "UserCharacters" DROP CONSTRAINT "UserCharacters_userId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP CONSTRAINT "Character_pkey",
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Character_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CharacterSpells" DROP CONSTRAINT "CharacterSpells_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "characterId",
ADD COLUMN     "characterId" INTEGER NOT NULL,
ADD CONSTRAINT "CharacterSpells_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "UserCharacters";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpells" ADD CONSTRAINT "CharacterSpells_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
