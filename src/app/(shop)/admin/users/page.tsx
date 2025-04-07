export const revalidate = 0;

import { Title } from "@/components";
import Pagination from "@/components/ui/pagination/Pagination";
// https://tailwindcomponents.com/component/hoverable-table

import { redirect } from "next/navigation";
import UserTable from "./ui/userTable";
import { getPaginatedUsers } from "@/actions/user/get-paginated-users";

// TODO: link documentation to the searchParams: https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function OrdersPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  // console.log(searchParams)
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const {
    totalPages,
    ok,
    users = [],
  } = await getPaginatedUsers({
    page,
  });

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="All Users" />

      <div className="mb-10">
        <UserTable users={users} />
      </div>

      <Pagination totalPages={totalPages!} />
    </>
  );
}
