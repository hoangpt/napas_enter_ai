/*
 Navicat Premium Dump SQL

 Source Server         : vks.bu
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 17/07/2025 15:49:18
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for nguyen_don
-- ----------------------------
DROP TABLE IF EXISTS "nguyen_don";
CREATE TABLE "nguyen_don" (
  "id" INTEGER NOT NULL,
  "ten" VARCHAR(200) NOT NULL,
  "dia_chi" TEXT NOT NULL,
  "created_at" DATETIME,
  "updated_at" DATETIME,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of nguyen_don
-- ----------------------------
INSERT INTO "nguyen_don" VALUES (1, 'Jiang Xiaoming', '5-2-10 Higashi Gotanda, Shinagawa-ku ', '2015-04-15 02:27:30', '2019-09-04 09:09:31');
INSERT INTO "nguyen_don" VALUES (2, 'Sheh Kwok Wing', '718 Lodge Ln, Toxteth', '2025-02-21 14:45:27', '2002-07-11 15:03:57');

PRAGMA foreign_keys = true;
