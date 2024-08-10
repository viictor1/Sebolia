/*
  Warnings:

  - You are about to drop the column `preco` on the `Livro` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Exemplar" (
    "estado" TEXT NOT NULL,
    "livroId" INTEGER NOT NULL,
    "preco" REAL NOT NULL,

    PRIMARY KEY ("livroId", "estado"),
    CONSTRAINT "Exemplar_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT NOT NULL,
    "ano" INTEGER NOT NULL
);
INSERT INTO "new_Livro" ("ano", "autor", "editora", "id", "titulo") SELECT "ano", "autor", "editora", "id", "titulo" FROM "Livro";
DROP TABLE "Livro";
ALTER TABLE "new_Livro" RENAME TO "Livro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
