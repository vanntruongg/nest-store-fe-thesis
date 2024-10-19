import { EUserStatus } from "~/common/utility/enum.util";

export const displayUserStatus = (userStatus: string) => {
  if (userStatus in EUserStatus) {
    return EUserStatus[userStatus as keyof typeof EUserStatus];
  }
  return userStatus;
};
