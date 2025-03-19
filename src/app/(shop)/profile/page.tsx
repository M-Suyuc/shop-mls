import { auth } from "@/auth";
import { Title } from "@/components";

export default async function ProdilePage() {
  const session = await auth();

  return (
    <div>
      <Title title="Profile" />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <h1>{session?.user.role}</h1>
    </div>
  );
}
