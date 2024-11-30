import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 z-10">
          <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[600px] min-h-full bg-white">
            <div className="px-4 py-3 flex items-end justify-between border-b">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="relative flex-1 px-4 py-6">
              <div className="space-y-6"></div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
