/*
  Warnings:

  - Added the required column `prepared` to the `CharacterSpells` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharacterSpells" ADD COLUMN     "prepared" BOOLEAN NOT NULL;
