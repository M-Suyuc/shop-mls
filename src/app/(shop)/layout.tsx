import { auth } from "@/auth";
import { Footer, Sidebar, TopMenu } from "@/components";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar session={session} />
      <div className="px-4 sm:px-10 lg:px-20">{children}</div>
      <Footer />
    </main>
  );
}
