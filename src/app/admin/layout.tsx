// import AdminNavBar from "./AdminNavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* <AdminNavBar /> */}
      {children}
    </main>
  );
}
