// app/admin/roles/actions.ts
'use server';

export async function fetchRoles() {
    const res = await fetch(`${process.env.BACKEND_URL}/roles`, {
        cache: 'no-store',
    });
    return res.json();
}

export async function fetchPermissions() {
    const res = await fetch(`${process.env.BACKEND_URL}/permissions`);
    return res.json();
}

export async function updateRolePermissions(roleId: number, permissionIds: number[]) {
    const res = await fetch(`${process.env.BACKEND_URL}/roles/${roleId}/permissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissions: permissionIds }),
    });
    return res.json();
}
