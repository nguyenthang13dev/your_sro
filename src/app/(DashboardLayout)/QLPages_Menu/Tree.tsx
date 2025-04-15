import React, { useEffect, useState } from 'react'
import SortableTree, { TreeItem } from '@nosferatu500/react-sortable-tree'
import '@nosferatu500/react-sortable-tree/style.css'
type Props = {
  data: TreeItem[]
}
const expandAllNodes = (nodes: TreeItem[]): TreeItem[] =>
  nodes.map((node: TreeItem) => ({
    ...node,
    expanded: true,
    children: node.children ? expandAllNodes(node.children as TreeItem[]) : [],
  }))

const ViewOnlyTree: React.FC<Props> = ({ data }: Props) => {
  const [treeData, setTreeData] = useState<TreeItem[]>([])
  useEffect(() => {
    setTreeData(expandAllNodes(data))
  }, [data])
  return (
    <div style={{ height: '74vh' }}>
      <SortableTree
        treeData={treeData}
        onChange={(treeData) => setTreeData(treeData)}
        canDrag={() => false}
      />
    </div>
  )
}

export default ViewOnlyTree
