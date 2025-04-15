'use client';
import { Card, Col, Row } from 'antd'
import TinhHinhPhanAnhChart from './TinhHinhPhanAnhChart'
import styles from './page.module.css'
import AutoBreadcrumb from '@/components/util-compenents/Breadcrumb'
import PhanAnhTheoSanPhamChart from './PhanAnhTheoSanPhamChart'
import ListThongBao from './ListThongBao'
import VanBanPhapLuatChart from './VanBanPhapLuatChart'
import PhanAnhTheoThuongHieuChart from './PhanAnhTheoThuongHieuChart'
import DiaPhuongPhanAnhTable from './DiaPhuongPhanAnhTable'
import CacSanPhamViPhamTable from './CacSanPhamViPhamTable'
import PhanAnhTheoDonViChuTriTable from './PhanAnhTheoDonViChuTri'
import PhanAnhHangHoaDichVu from './PhanAnhHangHoaDichVu'
import PhanAnhTheoDaiDienThuongHieuChart from './PhanAnhTheoDaiDienThuongHieuChart'

export default function Dashboard() {
  return (
    <>
      <div style={{ marginBottom: '1%' }}>
        <AutoBreadcrumb />
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Thông báo luồng rà soát "
            bordered={false}
            className={styles.customCardTitle}
          >
            <ListThongBao />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Văn bản pháp luật"
            bordered={false}
            className={styles.customCardTitle}
          >
            <VanBanPhapLuatChart />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Thống kê số lượng các phản ánh theo sản phẩm"
            bordered={false}
            className={styles.customCardTitle}
          >
            <PhanAnhTheoSanPhamChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Tình hình phản ánh, khiếu nại"
            bordered={false}
            className={styles.customCardTitle}
          >
            <TinhHinhPhanAnhChart />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="Thống kê số lượng các phản ánh theo các thương hiệu"
            bordered={false}
            className={styles.customCardTitle}
          >
            <PhanAnhTheoThuongHieuChart />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        {/* <Col span={12}>
                    <Card
                        title="Biểu đồ số lượng các phản ánh theo địa phương"
                        bordered={false}
                        className={styles.customCardTitle}
                    >
                        <DiaPhuongPhanAnh/>
                    </Card>
                </Col> */}
        <Col span={12}>
          <Card
            title="Thống kê số lượng các phản ánh theo địa phương"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DiaPhuongPhanAnhTable />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Thống kê số lượng phản ánh theo nhóm ngành hàng hóa, dịch vụ"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <PhanAnhHangHoaDichVu />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Thống kê số lượng phản ánh theo đơn vị chủ trì"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <PhanAnhTheoDonViChuTriTable />
          </Card>
        </Col>
        <Col span="12">
          <Card
            title="Thống kê các sản phẩm bị vi phạm"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CacSanPhamViPhamTable />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Thống kê số lượng phản ánh theo đại diện thương hiệu"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <PhanAnhTheoDaiDienThuongHieuChart />
          </Card>
        </Col>
        {/* <Col span="12">
                    <Card
                        title="Thống kê các sản phẩm bị vi phạm"
                        bordered={false}
                        className={styles.customCardTitle}
                        style={{ minHeight: '570px', display: 'flex', flexDirection: 'column' }}
                    >
                        <CacSanPhamViPhamTable />
                    </Card>
                </Col> */}
      </Row>
    </>
  )
}
