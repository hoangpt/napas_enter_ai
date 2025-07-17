/*
 Navicat Premium Dump SQL

 Source Server         : vks.bu
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 17/07/2025 15:49:27
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for bi_don
-- ----------------------------
DROP TABLE IF EXISTS "bi_don";
CREATE TABLE "bi_don" (
  "id" INTEGER NOT NULL,
  "ten" VARCHAR(200) NOT NULL,
  "dia_chi" TEXT NOT NULL,
  "created_at" DATETIME,
  "updated_at" DATETIME,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of bi_don
-- ----------------------------
INSERT INTO "bi_don" VALUES (1, 'Dawn Reynolds', '543 Lark Street', '2006-06-10 15:06:51', '2023-05-22 16:14:45');
INSERT INTO "bi_don" VALUES (2, 'Wei Lu', '37 Narborough Rd', '2014-03-12 08:41:14', '2009-11-01 18:18:31');

PRAGMA foreign_keys = true;
