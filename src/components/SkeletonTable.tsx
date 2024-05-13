import Skeleton from "@/components/Skeleton";
import Icon from "@/components/Icon";

export default function SkeletonTable({ rowNumber }: { rowNumber: number }) {
  return (
    <div className="no-scrollbar h-[calc(100dvh-258px)] overflow-auto rounded border-[1px] border-neutral-1-12 md:max-h-[calc(800px-258px)]">
      {Array.from({ length: rowNumber }).map((_, index) => (
        <div
          key={index}
          className="h-16 w-full cursor-pointer border-b border-neutral-1-12 bg-neutral-2 p-3"
        >
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-2 flex items-center">
              <Skeleton width="80px" />
            </div>
            <div className="flex items-center">
              <Skeleton width="40px" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton width="40px" />
              <Icon name="chevronRight" className="text-color-2" />
            </div>
            <div className="col-span-2 flex items-center">
              <Skeleton width="96px" />
            </div>
            <div className="flex items-center">
              <Skeleton width="48px" />
            </div>

            <div className="flex items-center">
              <Skeleton width="48px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
