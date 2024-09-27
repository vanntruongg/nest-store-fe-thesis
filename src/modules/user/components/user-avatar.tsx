import { Dispatch, SetStateAction } from "react";
import { BaseUtil } from "~/common/utility/base.util";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export interface Props {
  imageUrl?: string;
  firstName: string;
  onClick?: Dispatch<SetStateAction<any>>;
}

export function UserAvatar({ imageUrl, firstName, onClick }: Props) {
  return (
    <Avatar className="size-7 hover:cursor-pointer" onClick={onClick}>
      <AvatarImage src={imageUrl} alt="avatar user" />
      <AvatarFallback className="bg-gradient-to-br from-purple-800 to-pink-400 text-white">
        {/* <div
          className="border flex justify-center items-center bg-gradient-to-br
        from-purple-800 to-pink-400 text-white text-xl size-10 rounded-full"
        > */}
        {/* </div> */}
        {BaseUtil.generateDefaultAvatarInitial(firstName)}
      </AvatarFallback>
    </Avatar>
  );
}
