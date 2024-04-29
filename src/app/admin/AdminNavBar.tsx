// "use client";

// import { logout, validateRequest } from "@/lib/common/lucia";
// import Link from "next/link";
// import { useRouter } from "next/router";

// export default function AdminNavBar() {
//   const router = useRouter();

//   return (
//     <div className="px-3">
//       <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
//         <Link href="/admin" className="font-semibold underline">
//           Admin Dashboard
//         </Link>
//         <div className="space-x-2">
//           <span className="font-semibold">{user?.user?.email}</span>
//           <button
//             onClick={async () => {
//               await logout();
//               router.push("/");
//             }}
//             className="underline"
//           >
//             Log Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
