/*
  Warnings:

  - Added the required column `preco` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,
    "tituloLivro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,
    "preco" REAL NOT NULL
);
INSERT INTO "new_Transacao" ("clienteId", "data", "estado", "id", "livroId", "tipo", "tituloLivro") SELECT "clienteId", "data", "estado", "id", "livroId", "tipo", "tituloLivro" FROM "Transacao";
DROP TABLE "Transacao";
ALTER TABLE "new_Transacao" RENAME TO "Transacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
