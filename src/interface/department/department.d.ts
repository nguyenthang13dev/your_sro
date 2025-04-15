import EntityType from "../general";

export interface Department extends EntityType {
  name: string;
  code: string;
  parentId?: string;
  priority?: number;
  level: number;
  loai: string;
  isActive: boolean;
  departmentChilds?: Department[] | undefined;
}
export interface DepartmentDetail extends Department {
  users?: { id: string; name: string }[];
  children?: { id: string; name: string }[];
}

export interface DepartmentSearch extends SearchBase {
  name?: string;
  loai?: string;
  level?: number;
  parentId?: string;
  isActive?: boolean;
}

export interface TreeNode {
  id: string;
  title: string;
  code: string;
  parentId: string | null;
  priority: number;
  level: number;
  loai: string;
  isActive: boolean;
  children: TreeNode[] | null;
}
