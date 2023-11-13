import { dateToString } from "@/utils/helpers/others";

interface PbTimesProps {
  label?: React.ReactNode;
  timestamp: Date | string;
}

export function PBTimeStamp({ timestamp, label }: PbTimesProps) {
  return (
    <div className=" flex w-[90%] items-center justify-between border-t border-t-accent text-sm gap-2">
      {label && label}
      <h3>{dateToString(timestamp)}</h3>
    </div>
  );
}
