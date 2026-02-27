import { FileNode } from "@/types/database.types";

export interface TreeNode extends FileNode {
  children?: TreeNode[];
}

/**
 * [유틸 명세]: Flat한 파일 노드 리스트를 부모-자식 계층 구조로 변환함.
 * @param list - Supabase에서 가져온 전체 파일 노드 배열
 * @returns 계층화된 트리 구조의 루트 노드들
 */
export function listToTree(list: FileNode[]): TreeNode[] {
  const map: { [id: string]: number } = {};
  const roots: TreeNode[] = [];
  const nodes: TreeNode[] = list.map((node, index) => {
    map[node.id] = index;
    return { ...node, children: [] };
  });

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.parent_id) {
      const parentIndex = map[node.parent_id];
      if (parentIndex !== undefined) {
        nodes[parentIndex].children?.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return roots;
}
