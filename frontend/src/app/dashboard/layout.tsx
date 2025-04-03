export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-1/4 p-4 bg-gray-100">Sidebar</aside>
      <main className="flex-1 p-4">{children}</main>
      <aside className="w-1/4 p-4 bg-gray-100">Profile</aside>
    </div>
  )
}
