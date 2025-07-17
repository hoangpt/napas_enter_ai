/*
 Navicat Premium Dump SQL

 Source Server         : vks.bu
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 17/07/2025 15:49:08
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for ho_so_thu_ly
-- ----------------------------
DROP TABLE IF EXISTS "ho_so_thu_ly";
CREATE TABLE "ho_so_thu_ly" (
  "id" INTEGER NOT NULL,
  "ma" VARCHAR(50) NOT NULL,
  "dia_diem" VARCHAR(200) NOT NULL,
  "ngay_gio" DATETIME NOT NULL,
  "noi_dung_vu_viec" TEXT NOT NULL,
  "nguyen_don_id" INTEGER NOT NULL,
  "bi_don_id" INTEGER NOT NULL,
  "created_at" DATETIME,
  "updated_at" DATETIME,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("nguyen_don_id") REFERENCES "nguyen_don" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("bi_don_id") REFERENCES "bi_don" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  UNIQUE ("ma" ASC)
);

-- ----------------------------
-- Records of ho_so_thu_ly
-- ----------------------------
INSERT INTO "ho_so_thu_ly" VALUES (1, 'wL4nmlqBlQ', '539 Jingtian East 1st St, Futian District', '2020-09-17 01:11:06', '6t43hM9OOS', 1, 1, '2007-06-09 22:06:34', '2020-06-23 12:44:57');
INSERT INTO "ho_so_thu_ly" VALUES (2, 'qxw4QrYrgX', '6-1-14, Miyanomori 4 Jō, Chuo Ward', '2024-04-04 22:00:22', 'SHFCiSBLnU', 2, 2, '2006-09-08 04:34:29', '2003-05-17 17:47:22');

PRAGMA foreign_keys = true;
