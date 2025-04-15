'use client'

import { Checkbox, Form, Input, InputRef, Modal, Radio, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import classes from './page.module.css'
import { tableQLPagesDataType, createEditType } from '@/interface/QLPage/qLPage'
import { qlPagesService } from '@/services/QLPages/QLPages.service'
import { PageSlugConstant } from '@/constants/PageSlugConstant'
import { RadioChangeEvent } from 'antd/lib'

interface CreateProps {
  isOpen: boolean
  data?: tableQLPagesDataType
  onClose: () => void
  onSuccess: () => void
}

const convertChuyenMucToCreateEdit = (
  chuyenMuc: tableQLPagesDataType
): createEditType => {
  return {
    id: chuyenMuc.id,
    titlePage: chuyenMuc.titlePage || '',
    metaTitle: chuyenMuc.metaKeyword || '',
    metaDescription: chuyenMuc.metaDescription || '',
    metaKeyword: chuyenMuc.metaKeyword || '',
    slug: chuyenMuc.slug || '',
    type: chuyenMuc.type || '',
  }
}

const CreateUpdateForm: React.FC<CreateProps> = ({
  isOpen,
  data,
  onClose,
  onSuccess,
}: CreateProps) => {
  const [form] = Form.useForm()
  const inputRef = useRef<InputRef | null>(null)
  const handleFinish = async () => {
    const param = await form.validateFields()
    try {
      if (data) {
        const response = await qlPagesService.Update({
          ...param,
          id: data.id,
        })
        if (response.status) {
          toast.success('Cập nhật thành công')
        } else {
          toast.error(response.message)
        }
      } else {
        const response = await qlPagesService.Create(param)
        if (response.status) {
          toast.success('Thêm mới thành công')
        } else {
          toast.error(response.message)
        }
      }
      form.resetFields()
      onSuccess()
      onClose()
    } catch (error) {
      toast.error('Có lỗi xảy ra: ' + error)
    }
  }
  const handleCancel = () => {
    onClose()
  }

  const handleChangeRadio = (e: RadioChangeEvent) => {
    const value = e.target.value
    form.setFieldValue('slug', value)
    if (inputRef.current && inputRef.current.input)
      inputRef.current.input.readOnly = !!value
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue(convertChuyenMucToCreateEdit(data))
    } else {
      form.setFieldsValue({
        titlePage: '',
        metaTitle: '',
        metaDescription: '',
        metaKeyword: '',
        slug: '',
        type: '',
        radioValue: '',
      })
    }
  })
  return (
    <Modal
      title={
        <div style={{ textAlign: 'center' }}>
          {data ? 'Chỉnh sửa chuyên mục' : 'Thêm mới chuyên mục'}
        </div>
      }
      open={isOpen}
      onOk={() => handleFinish()}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Đóng"
      width={600}
    >
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: 1000 }}
        autoComplete="off"
      >
        <Form.Item<createEditType>
          label={<strong>Tiêu đề page</strong>}
          name="titlePage"
        >
          <Input placeholder="Nhập tên tiêu đề" />
        </Form.Item>

        <Form.Item<createEditType>
          label={<strong>Đường dẫn slug</strong>}
          name="slug"
        >
          <Input ref={inputRef} placeholder="Nhập đường dẫn slug" />
        </Form.Item>

        <Form.Item name="radioValue">
          <Radio.Group
            style={{
              display: 'flex',
              marginBottom: 5,
              gap: 8,
            }}
            onChange={handleChangeRadio}
            options={[
              { value: '', label: 'Trang tuỳ chỉnh' },
              { value: PageSlugConstant.TrangChu, label: 'Trang chủ' },
              { value: PageSlugConstant.TrangChiTiet, label: 'Trang chi tiết' },
              { value: PageSlugConstant.ChuyenMucTin, label: 'Chuyên mục tin' },
            ]}
          />
        </Form.Item>

        <Form.Item<createEditType>
          label={<strong>Mô tả</strong>}
          name="metaDescription"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thông tin này!',
            },
          ]}
        >
          <TextArea placeholder="Nhập đường dẫn slug" />
        </Form.Item>

        <Form.Item<createEditType>
          label={<strong>Tiêu đều meta</strong>}
          name="metaTitle"
        >
          <Input placeholder="Nhập đường dẫn slug" />
        </Form.Item>

        <Form.Item<createEditType>
          label={<strong>Danh sách từ khóa</strong>}
          name="metaKeyword"
        >
          <Input />
        </Form.Item>

        <Form.Item<createEditType>
          label={<strong>Loại trang</strong>}
          name="type"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUpdateForm
