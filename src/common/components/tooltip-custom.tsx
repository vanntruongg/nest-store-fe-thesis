import { ReactNode } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

export interface ITooltipCustomProps {
  children: ReactNode;
  content: string;
  disable?: boolean;
  classNameTrigger?: string;
  classNameContent?: string;
}

const TooltipCustom = ({
  children,
  content,
  disable,
  classNameTrigger,
  classNameContent,
}: ITooltipCustomProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger
          className={cn(classNameTrigger, {
            "cursor-not-allowed": disable,
          })}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className={classNameContent}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCustom;
