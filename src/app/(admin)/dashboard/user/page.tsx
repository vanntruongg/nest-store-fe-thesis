"use client";
import { useEffect, useState } from "react";
import {
  deleteUser,
  getAllUser,
  updateUser,
} from "~/modules/user/services/UserService";
import { BaseUtil } from "~/common/utility/base.util";
import { userTableColumns } from "./user-table-columns";
import { TableDataAdmin } from "~/modules/admin/components/table";
import { UserGet } from "~/modules/user/model/UserGet";
import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import { UserPut } from "~/modules/user/model/UserPut";
import { toast } from "~/components/ui/use-toast";
import { Pagination } from "~/modules/admin/components/pagination";

const UserManagement = () => {
  const [data, setData] = useState<UserGet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

  useEffect(() => {
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
    fetchData();
  }, [pageNo, pageSize]);

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
