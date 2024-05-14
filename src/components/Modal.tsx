import { useRef, useEffect } from "react";

import Icon from "@/components/Icon";

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const layout = document.getElementById("layout");
    if (layout) {
      if (isOpen) {
        layout.classList.add("no-scroll");
      } else {
        layout.classList.remove("no-scroll");
      }
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-40px)] max-w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-2 p-6 shadow-40 lg:top-[400px]"
          ref={containerRef}
        >
          <div className="flex w-full justify-between gap-6">
            <div className="font-lufthansa-2 text-color-lufthansa-1">
              {title}
            </div>
            <button
              type="button"
              className="h-11 w-11 rounded-md border-[0.5px] border-neutral-1-12 bg-neutral-2-60 p-[10px]"
              onClick={onClose}
            >
              <Icon name="close" className="h-6 w-6 text-color-lufthansa-1" />
            </button>
          </div>
          {children}
        </div>
      )}
    </>
  );
}
