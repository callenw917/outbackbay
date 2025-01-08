/*
  Warnings:

  - The primary key for the `Spell` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Spell` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `spellId` on the `CharacterSpells` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CharacterSpells" DROP CONSTRAINT "CharacterSpells_spellId_fkey";

-- AlterTable
ALTER TABLE "CharacterSpells" DROP COLUMN "spellId",
ADD COLUMN     "spellId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Spell" DROP CONSTRAINT "Spell_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Spell_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "CharacterSpells" ADD CONSTRAINT "CharacterSpells_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
