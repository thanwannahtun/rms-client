// // hooks/usePermissions.ts
// export const usePermissions = () => {
//     const { data: session } = useSession();
//     return {
//       can: (perm: string) => session?.user.permissions?.includes(perm),
//     };
//   };
  
//   // usage in components
//   {can('create:bus-type') && <Button>Create Bus</Button>}

// hooks/usePermissions.ts
// export const usePermissions = () => {
//     const { data: session } = useSession();
//     return {
//       hasPermission: (perm: string) => session?.user.permissions?.includes(perm),
//     };
//   };
  
//   // usage in UI
//   const { hasPermission } = usePermissions();
  
//   {hasPermission("create:bus-type") && (
//     <Button onClick={openBusModal}>Add Bus Type</Button>
//   )}
  