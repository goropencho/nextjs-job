import { ClerkProvider } from "@clerk/nextjs";
import AdminNavBar from "./AdminNavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <AdminNavBar />
      {children}
    </ClerkProvider>
  );
}
