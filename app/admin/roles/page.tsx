
// app/admin/roles/page.tsx
import { fetchRoles, fetchPermissions } from './actions';
import RolePermissionTable from './RolePermissionTable';

export default async function RolePage() {
//   const [roles, permissions] = await Promise.all([
//     fetchRoles(),
//     fetchPermissions(),
//   ]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Role Permission Management</h2>
      {/* <RolePermissionTable roles={roles} permissions={permissions} /> */}
      <RolePermissionTable />
    </div>
  );
}


// /app/admin/roles
//   ├─ page.tsx                     ← role/permission manager
//   ├─ actions.ts                   ← Server Actions (calls Express)
//   ├─ RolePermissionTable.tsx     ← Main UI table
//   └─ RolePermissionForm.tsx      ← UI to add/remove permissions
