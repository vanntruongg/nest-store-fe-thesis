"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TableDataAdmin = dynamic(
  () => import("~/modules/admin/components/table"),
  {
    ssr: false,
  }
);
const Pagination = dynamic(
  () => import("~/modules/admin/components/pagination"),
  {
    ssr: false,
  }
);
import {
  deleteUser,
  getAllUser,
  searchUserByName,
  updateUser,
} from "~/modules/user/services/UserService";
import { UserGet } from "~/modules/user/model/UserGet";
import { UserPut } from "~/modules/user/model/UserPut";

import useDebounce from "~/hooks/useDebounce";

import { BaseUtil } from "~/common/utility/base.util";

import { userTableColumns } from "./user-table-columns";
import { toast } from "~/components/ui/use-toast";
import { Input } from "~/components/ui/input";

const UserManagement = () => {
  const [data, setData] = useState<UserGet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");

  const debounceSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const handleSearchUser = async () => {
      setLoading(true);
      try {
        const res = await searchUserByName(
          debounceSearchValue,
          pageNo,
          pageSize
        );
        setData(res.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAllUser(pageNo, pageSize);
        setData(result.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    };
    if (debounceSearchValue === "") {
      fetchData();
    } else {
      handleSearchUser();
    }
  }, [debounceSearchValue, pageNo, pageSize]);

  const handleUpdateUser = async (userPut: UserPut) => {
    try {
      const result = await updateUser(userPut);
      toast({ description: result.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (email: string) => {
    try {
      const result = await deleteUser(email);
      toast({ description: result.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  const columns = userTableColumns(handleUpdateUser, handleDeleteUser);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Người dùng</h2>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Tìm kiếm người dùng..."
        required={true}
        className="max-w-72"
      />
      <TableDataAdmin
        data={data?.userList || []}
        loading={loading}
        columns={columns}
      />
      {data && (
        <Pagination
          pageNo={pageNo}
          setPageNo={setPageNo}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={data.totalPages}
          totalElements={data.totalElements}
        />
      )}
    </div>
  );
};

export default UserManagement;
