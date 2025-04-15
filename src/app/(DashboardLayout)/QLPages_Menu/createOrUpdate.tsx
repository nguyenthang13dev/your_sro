import { DropdownOptionAntd, DropdownTreeOptionAntd } from '@/interface/general'
import {
  createEditType,
  tableQLPages_MenuDataType,
} from '@/interface/QLPages_Menu/QLPages_Menu'
import { QLPageMenuService } from '@/services/QLPages_Menu/QLPages_Menu.service'
import { createSlugPage } from '@/utils/string'
import { Form, FormProps, Input, Modal, Select, TreeSelect } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { qLPage_ComponentService } from '@/services/QLPage_Component/QLPage_Component.service'
import { MENU } from '@/constants/TypeCompoentConstant'
interface Props {
  isOpen: boolean
  QLPage_Menu?: tableQLPages_MenuDataType | null
  menuTree: tableQLPages_MenuDataType[]
  dropdownList: DropdownTreeOptionAntd[]
  pageDropdown: DropdownTreeOptionAntd[]
  onClose: () => void
  onSuccess: () => void
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen)
  const [codeDropdown, setCodeDropdown] = useState<DropdownOptionAntd[]>([])

  const findMenuItemById = (
    menuTree: tableQLPages_MenuDataType[],
    id: string
  ): tableQLPages_MenuDataType | null => {
    for (const menuItem of menuTree) {
      if (menuItem.id === id) return menuItem
      if (menuItem.children.length > 0) {
        const found = findMenuItemById(menuItem.children, id)
        return found
      }
    }
    return null
  }

  const getMenuItem = (id: string): tableQLPages_MenuDataType | null => {
    if (props.menuTree.length <= 0) return null
    return findMenuItemById(props.menuTree, id)
  }

  const handleGenerateSlug = () => {
    const page = form.getFieldValue('page')
    if (page) {
      const parentId = form.getFieldValue('parentId')
      const isParent = !parentId
      const title = form.getFieldValue('title') || ''
      if (!isParent) {
        const parent = getMenuItem(parentId)

        const parentSlug = parent?.slug || ''
        const startPos = parentSlug.indexOf('/')
        const middleSlug =
          startPos >= 0 ? parentSlug.substring(startPos + 1) : ''
        console.log(middleSlug)

        form.setFieldValue(
          'slug',
          `${page}/${
            middleSlug ? middleSlug + '/' : middleSlug
          }${createSlugPage(title)}`
        )
      } else {
        form.setFieldValue('slug', page)
      }
    }
  }

  const handleOnFinish: FormProps<createEditType>['onFinish'] = async (
    formData: createEditType
  ) => {
    try {
      if (props.QLPage_Menu) {
        const response = await QLPageMenuService.CreateOrUpdate(formData)
        if (response.status) {
          toast.success('Chỉnh sửa thành công')
          form.resetFields()
          props.onSuccess()
          props.onClose()
        } else {
          toast.error(response.message)
        }
      } else {
        const response = await QLPageMenuService.CreateOrUpdate(formData)
        if (response.status) {
          toast.success('Thêm mới thành công')
          form.resetFields()
          props.onSuccess()
          props.onClose()
        } else {
          toast.error(response.message)
        }
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra: ' + error)
    }
  }

  const handleMapEdit = () => {
    form.setFieldValue('id', props.QLPage_Menu?.id)
    form.setFieldsValue(props.QLPage_Menu)
  }

  const handleCancel = () => {
    setIsOpen(false)
    form.resetFields()
    props.onClose()
  }

  useEffect(() => {
    setIsOpen(props.isOpen)
    if (props.QLPage_Menu) {
      handleMapEdit()
      console.log(props.QLPage_Menu)
    } else {
      form.resetFields()
    }
    qLPage_ComponentService
      .GetDropdownCode(MENU)
      .then((res) => {
        if (res.data) {
          setCodeDropdown(res.data)
        } else {
          console.error(res.message)
        }
      })
      .catch((err) => console.error(err))
  }, [props.isOpen])

  return (
    <Modal
      title={
        props.QLPage_Menu != null ? 'Chỉnh sửa menu page' : 'Thêm mới menu page'
      }
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      width={600}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        style={{ maxWidth: 1000 }}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        <Form.Item label="Menu cha" name="parentId">
          <TreeSelect
            showSearch
            allowClear
            onClear={() => {
              const page = form.getFieldValue('page') ?? ''
              form.setFieldValue('slug', page ?? '')
            }}
            onChange={handleGenerateSlug}
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeDefaultExpandAll
            treeData={props.dropdownList}
          />
        </Form.Item>
        <Form.Item
          label="Page"
          name="page"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn thông tin này!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            onChange={handleGenerateSlug}
          >
            {props.pageDropdown &&
              props.pageDropdown.map((item, index) => (
                <Select.Option key={`tinh${index}`} value={item.value}>
                  {item.title}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item<createEditType> name="id" hidden>
          <Input type="hiden" />
        </Form.Item>
        <Form.Item<createEditType>
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thông tin này!',
            },
          ]}
        >
          <Input onChange={handleGenerateSlug} />
        </Form.Item>

        <Form.Item<createEditType>
          label="Slug"
          name="slug"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thông tin này!',
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn thông tin này!',
            },
          ]}
        >
          <Select showSearch optionFilterProp="children">
            {codeDropdown &&
              codeDropdown.map((item, index) => (
                <Select.Option key={`tinh${index}`} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item<createEditType>
          label="api"
          name="api"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thông tin này!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType> label="Key slug" name="keySlug">
          <Input />
        </Form.Item>

        <Form.Item<createEditType> label="Params api" name="paramsApi">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default CreateOrUpdate
