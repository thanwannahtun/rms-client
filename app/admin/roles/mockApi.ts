// app/admin/roles/mockApi.ts

type Role = { id: number; name: string };
type Permission = { id: number; name: string };

export const mockRoles: Role[] = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'agent' },
  { id: 3, name: 'gate' },
];

export const mockPermissions: Permission[] = [
  { id: 1, name: 'create:bus-type' },
  { id: 2, name: 'view:bus-type' },
  { id: 3, name: 'delete:bus-type' },
  { id: 4, name: 'create:trip' },
  { id: 5, name: 'view:trip' },
];

let rolePermissions: Record<number, number[]> = {
  1: [1, 2, 3], // admin
  2: [2, 4],    // agent
  3: [5],       // gate
};

export async function fetchMockRoles(): Promise<Role[]> {
  return new Promise((res) => setTimeout(() => res(mockRoles), 300));
}

export async function fetchMockPermissions(): Promise<Permission[]> {
  return new Promise((res) => setTimeout(() => res(mockPermissions), 300));
}

export async function fetchRolePermissions(roleId: number): Promise<number[]> {
  return new Promise((res) =>
    setTimeout(() => res(rolePermissions[roleId] || []), 200)
  );
}

export async function updateRolePermissions(roleId: number, permissionIds: number[]) {
  return new Promise((res) => {
    rolePermissions[roleId] = permissionIds;
    setTimeout(() => res({ success: true }), 500);
  });
}
