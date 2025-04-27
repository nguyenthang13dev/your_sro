"use client";

import { useState } from 'react';
import styles from './server.module.css';

export default function ServerStatus() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.serverStatusContainer}>
      {/* Header */}
      <div className="header-card">
        <h3>Thông tin máy chủ</h3>
      </div>

      {/* Body */}
      <div className={styles.serverBody}>
        <div 
          className={`${styles.serverContent} ${isExpanded ? 'max-h-[2000px]' : 'max-h-[280px]'}`}
        >
          <div className="space-y-4">
            <p>THÔNG TIN MÁY CHỦ:</p>
            <ul>
              <li>Max cap: 90 / Class: Only Asia / Skill: 90 / Master: 270 điểm</li>
              <li>Ghost Skill: Không Ghost / Item: ITEM D9 - SOX</li>
              <li>Giới hạn: 3 acc/PC, 1JOB / 1IP / khoá buôn (00h00-8h00)</li>
              <li>Time: 5 giờ xanh / 1 giờ vàng</li>
              <li>Trang bị: FULL Từ D1 - D9, đủ SOX</li>
              <li>Hiệu ứng vũ khí: Chuẩn VDC</li>
              <li>Không có hệ thống Gacha</li>
              <li>LKD Đặt biệt: Có LKD</li>
              <li>Item vứt shop: 1 vàng</li>
              <li>SHOP NPC: Giá 10.000 VNĐ (sự kiện)</li>
            </ul>

            <div className={styles.supportSection}>
              <p>HỖ TRỢ KHI OPEN:</p>
              <ul>
                <li>Tặng GIFTCODE trị giá 200k</li>
                <li>Tặng VIP CODE khi tham gia sự kiện</li>
                <li>Hệ thống WEBSHOP</li>
                <li>Thu mua Silk, Gold</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Expand button */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className={styles.expandButton}
          >
            Xem thêm
          </button>
        )}
      </div>
    </div>
  );
}
