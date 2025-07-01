'use client';
import {
  fetchMockRoles,
  fetchMockPermissions,
  fetchRolePermissions,
  updateRolePermissions,
} from './mockApi';
import { useEffect, useState } from 'react';

export default function RolePermissionTable() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedPerms, setSelectedPerms] = useState<number[]>([]);

  useEffect(() => {
    fetchMockRoles().then(setRoles);
    fetchMockPermissions().then(setPermissions);
  }, []);

  useEffect(() => {
    if (selectedRoleId !== null) {
      fetchRolePermissions(selectedRoleId).then(setSelectedPerms);
    }
  }, [selectedRoleId]);

  const handleSave = async () => {
    if (selectedRoleId !== null) {
      await updateRolePermissions(selectedRoleId, selectedPerms);
      alert('Permissions updated!');
    }
  };

  return (
    <div className="space-y-4">
      <select
        className="border p-2"
        onChange={(e) => setSelectedRoleId(Number(e.target.value))}
        value={selectedRoleId ?? ''}
      >
        <option value="" disabled>Select Role</option>
        {roles.map((r) => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>

      {selectedRoleId && (
        <>
          <div className="grid grid-cols-2 gap-2">
            {permissions.map((perm) => (
              <label key={perm.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPerms.includes(perm.id)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelectedPerms((prev) =>
                      checked
                        ? [...prev, perm.id]
                        : prev.filter((id) => id !== perm.id)
                    );
                  }}
                />
                {perm.name}
              </label>
            ))}
          </div>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Permissions
          </button>
        </>
      )}
    </div>
  );
}


// // app/admin/roles/RolePermissionTable.tsx
// 'use client';

// import { updateRolePermissions } from './actions';
// import { useState } from 'react';

// interface Role {
//   id: number;
//   name: string;
// }

// interface Permission {
//   id: number;
//   name: string;
// }

// export default function RolePermissionTable({ roles, permissions }: { roles: Role[]; permissions: Permission[] }) {
//   const [selectedRoleId, setSelectedRoleId] = useState(roles[0]?.id);
//   const [selectedPerms, setSelectedPerms] = useState<number[]>([]);

//   const handleSave = async () => {
//     await updateRolePermissions(selectedRoleId, selectedPerms);
//     alert('Updated successfully!');
//   };

//   return (
//     <div className="space-y-4">
//       <select
//         className="border p-2"
//         value={selectedRoleId}
//         onChange={(e) => setSelectedRoleId(Number(e.target.value))}
//       >
//         {roles.map((r) => (
//           <option key={r.id} value={r.id}>{r.name}</option>
//         ))}
//       </select>

//       <div className="grid grid-cols-2 gap-2">
//         {permissions.map((perm) => (
//           <label key={perm.id} className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               value={perm.id}
//               checked={selectedPerms.includes(perm.id)}
//               onChange={(e) => {
//                 const checked = e.target.checked;
//                 setSelectedPerms((prev) =>
//                   checked ? [...prev, perm.id] : prev.filter((id) => id !== perm.id)
//                 );
//               }}
//             />
//             {perm.name}
//           </label>
//         ))}
//       </div>

//       <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Save Permissions
//       </button>
//     </div>
//   );
// }
