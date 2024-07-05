// import React from "react";
// import { Button, Dialog, DialogTrigger, Modal } from "react-aria-components";

// interface Props {}

// const SlideOver: React.FC<Props> = () => {
//     return (
//         <DialogTrigger>
//             <Button className="mt-80 h-60">Sign up…</Button>
//             <Modal>
//                 <Dialog>
//                     {({ close }: any) => (
//                         <React.Fragment>
//                             <div className="relative z-40" role="dialog" aria-modal="true">
//                                 <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//                                 <div className="fixed inset-0 overflow-hidden">
//                                     <div className="absolute inset-0 overflow-hidden">
//                                         <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//                                             <div className="pointer-events-auto relative w-96">
//                                                 <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
//                                                     <button
//                                                         type="button"
//                                                         className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
//                                                         onClick={close}
//                                                     >
//                                                         <span className="absolute -inset-2.5"></span>
//                                                         <span className="sr-only">Close panel</span>
//                                                         <svg
//                                                             className="h-6 w-6"
//                                                             fill="none"
//                                                             viewBox="0 0 24 24"
//                                                             stroke-width="1.5"
//                                                             stroke="currentColor"
//                                                             aria-hidden="true"
//                                                         >
//                                                             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                                         </svg>
//                                                     </button>
//                                                 </div>
//                                                 <div className="h-full overflow-y-auto bg-white p-8">
//                                                     <div className="space-y-6 pb-16">
//                                                         <div>
//                                                             <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
//                                                                 <img
//                                                                     src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
//                                                                     alt=""
//                                                                     className="object-cover"
//                                                                 />
//                                                             </div>
//                                                             <div className="mt-4 flex items-start justify-between">
//                                                                 <div>
//                                                                     <h2 className="text-base font-semibold leading-6 text-gray-900">
//                                                                         <span className="sr-only">Details for </span>IMG_4985.HEIC
//                                                                     </h2>
//                                                                     <p className="text-sm font-medium text-gray-500">3.9 MB</p>
//                                                                 </div>
//                                                                 <button
//                                                                     type="button"
//                                                                     className="relative ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                                                 >
//                                                                     <span className="absolute -inset-1.5"></span>
//                                                                     <svg
//                                                                         className="h-6 w-6"
//                                                                         fill="none"
//                                                                         viewBox="0 0 24 24"
//                                                                         stroke-width="1.5"
//                                                                         stroke="currentColor"
//                                                                         aria-hidden="true"
//                                                                     >
//                                                                         <path
//                                                                             stroke-linecap="round"
//                                                                             stroke-linejoin="round"
//                                                                             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                                                                         />
//                                                                     </svg>
//                                                                     <span className="sr-only">Favorite</span>
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                         <div>
//                                                             <h3 className="font-medium text-gray-900">Information</h3>
//                                                             <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
//                                                                 <div className="flex justify-between py-3 text-sm font-medium">
//                                                                     <dt className="text-gray-500">Uploaded by</dt>
//                                                                     <dd className="text-gray-900">Marie Culver</dd>
//                                                                 </div>
//                                                                 <div className="flex justify-between py-3 text-sm font-medium">
//                                                                     <dt className="text-gray-500">Created</dt>
//                                                                     <dd className="text-gray-900">June 8, 2020</dd>
//                                                                 </div>
//                                                                 <div className="flex justify-between py-3 text-sm font-medium">
//                                                                     <dt className="text-gray-500">Last modified</dt>
//                                                                     <dd className="text-gray-900">June 8, 2020</dd>
//                                                                 </div>
//                                                                 <div className="flex justify-between py-3 text-sm font-medium">
//                                                                     <dt className="text-gray-500">Dimensions</dt>
//                                                                     <dd className="text-gray-900">4032 x 3024</dd>
//                                                                 </div>
//                                                                 <div className="flex justify-between py-3 text-sm font-medium">
//                                                                     <dt className="text-gray-500">Resolution</dt>
//                                                                     <dd className="text-gray-900">72 x 72</dd>
//                                                                 </div>
//                                                             </dl>
//                                                         </div>
//                                                         <div>
//                                                             <h3 className="font-medium text-gray-900">Description</h3>
//                                                             <div className="mt-2 flex items-center justify-between">
//                                                                 <p className="text-sm italic text-gray-500">Add a description to this image.</p>
//                                                                 <button
//                                                                     type="button"
//                                                                     className="relative -mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                                                 >
//                                                                     <span className="absolute -inset-1.5"></span>
//                                                                     <svg
//                                                                         className="h-5 w-5"
//                                                                         viewBox="0 0 20 20"
//                                                                         fill="currentColor"
//                                                                         aria-hidden="true"
//                                                                     >
//                                                                         <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
//                                                                     </svg>
//                                                                     <span className="sr-only">Add description</span>
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                         <div>
//                                                             <h3 className="font-medium text-gray-900">Shared with</h3>
//                                                             <ul
//                                                                 role="list"
//                                                                 className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200"
//                                                             >
//                                                                 <li className="flex items-center justify-between py-3">
//                                                                     <div className="flex items-center">
//                                                                         <img
//                                                                             src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
//                                                                             alt=""
//                                                                             className="h-8 w-8 rounded-full"
//                                                                         />
//                                                                         <p className="ml-4 text-sm font-medium text-gray-900">Aimee Douglas</p>
//                                                                     </div>
//                                                                     <button
//                                                                         type="button"
//                                                                         className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                                                     >
//                                                                         Remove<span className="sr-only"> Aimee Douglas</span>
//                                                                     </button>
//                                                                 </li>
//                                                                 <li className="flex items-center justify-between py-3">
//                                                                     <div className="flex items-center">
//                                                                         <img
//                                                                             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                                                                             alt=""
//                                                                             className="h-8 w-8 rounded-full"
//                                                                         />
//                                                                         <p className="ml-4 text-sm font-medium text-gray-900">Andrea McMillan</p>
//                                                                     </div>
//                                                                     <button
//                                                                         type="button"
//                                                                         className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                                                     >
//                                                                         Remove<span className="sr-only"> Andrea McMillan</span>
//                                                                     </button>
//                                                                 </li>
//                                                                 <li className="flex items-center justify-between py-2">
//                                                                     <button
//                                                                         type="button"
//                                                                         className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                                                     >
//                                                                         <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
//                                                                             <svg
//                                                                                 className="h-5 w-5"
//                                                                                 viewBox="0 0 20 20"
//                                                                                 fill="currentColor"
//                                                                                 aria-hidden="true"
//                                                                             >
//                                                                                 <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
//                                                                             </svg>
//                                                                         </span>
//                                                                         <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
//                                                                             Share
//                                                                         </span>
//                                                                     </button>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className="flex">
//                                                             <button
//                                                                 type="button"
//                                                                 className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                                                             >
//                                                                 Download
//                                                             </button>
//                                                             <button
//                                                                 type="button"
//                                                                 className="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </React.Fragment>
//                     )}
//                 </Dialog>
//             </Modal>
//         </DialogTrigger>
//     );
// };

// export { SlideOver };

// import React, { useState } from "react";
// import { useOverlay, usePreventScroll, useModal, OverlayProvider, useButton } from "react-aria";
// import { useOverlayTriggerState } from "react-stately";

// type SlideoverProps = {
//     title: string;
//     children: React.ReactNode;
//     direction?: "left" | "right" | "top" | "bottom" | undefined;
// };

// const Slideover: React.FC<SlideoverProps> = ({ title, children, direction = "right" }) => {
//     const state = useOverlayTriggerState({});
//     const [currentDirection, setCurrentDirection] = useState(direction);

//     const openButtonRef = React.useRef<HTMLButtonElement>(null);
//     const closeButtonRef = React.useRef<HTMLButtonElement>(null);
//     const { buttonProps: openButtonProps } = useButton(
//         {
//             onPress: () => state.open(),
//         },
//         openButtonRef
//     );
//     const { buttonProps: closeButtonProps } = useButton(
//         {
//             onPress: () => state.close(),
//         },
//         closeButtonRef
//     );

//     usePreventScroll({ isDisabled: !state.isOpen });
//     const { overlayProps } = useOverlay(
//         {
//             isOpen: state.isOpen,
//             onClose: state.close,
//             isDismissable: true,
//         },
//         React.useRef<HTMLDivElement>(null)
//     );

//     const { modalProps } = useModal();

//     const getSlideoverClasses = () => {
//         const baseClasses = "fixed bg-white shadow-lg transition-transform duration-300 ease-in-out";
//         const directionClasses = {
//             left: "top-0 left-0 bottom-0 w-80 transform",
//             right: "top-0 right-0 bottom-0 w-80 transform",
//             top: "top-0 left-0 right-0 h-80 transform",
//             bottom: "bottom-0 left-0 right-0 h-80 transform",
//         };
//         const translateClasses = {
//             left: state.isOpen ? "translate-x-0" : "-translate-x-full",
//             right: state.isOpen ? "translate-x-0" : "translate-x-full",
//             top: state.isOpen ? "translate-y-0" : "-translate-y-full",
//             bottom: state.isOpen ? "translate-y-0" : "translate-y-full",
//         };
//         return `${baseClasses} ${directionClasses[currentDirection]} ${translateClasses[currentDirection]}`;
//     };

//     return (
//         <OverlayProvider>
//             <button {...openButtonProps} ref={openButtonRef} className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
//                 Open Slideover
//             </button>
//             {state.isOpen && <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => state.close()} />}
//             <div {...overlayProps} {...modalProps} className={getSlideoverClasses()}>
//                 <div className="p-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold">{title}</h2>
//                         <button {...closeButtonProps} ref={closeButtonRef} className="text-gray-500 hover:text-gray-700">
//                             &times;
//                         </button>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="direction-select" className="mr-2">
//                             Direction:
//                         </label>
//                         <select
//                             id="direction-select"
//                             value={currentDirection}
//                             onChange={(e) => setCurrentDirection(e.target.value as SlideoverProps["direction"])}
//                             className="border p-1 rounded"
//                         >
//                             <option value="left">Left</option>
//                             <option value="right">Right</option>
//                             <option value="top">Top</option>
//                             <option value="bottom">Bottom</option>
//                         </select>
//                     </div>
//                     {children}
//                 </div>
//             </div>
//         </OverlayProvider>
//     );
// };

// export default Slideover;

// src/Slideover.tsx
import React from "react";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { useOverlay, usePreventScroll, useModal, OverlayContainer } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { useButton } from "@react-aria/button";

interface SlideoverProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const SlideOver: React.FC<SlideoverProps> = ({ isOpen, onClose, children }) => {
    usePreventScroll();
    let ref = React.useRef<HTMLDivElement>(null);
    let { overlayProps } = useOverlay({ isOpen, onClose, isDismissable: true }, ref);
    let { modalProps } = useModal();
    let { dialogProps } = useDialog({}, ref);

    return (
        <OverlayContainer>
            <FocusScope contain restoreFocus autoFocus>
                <div
                    {...overlayProps}
                    {...dialogProps}
                    {...modalProps}
                    ref={ref}
                    className={`fixed top-0 right-0 w-80 h-80 bg-red-500 shadow-lg transform transition-transform z-50 ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold text-gray-600">
                        ×
                    </button>
                    <div className="p-6">{children}</div>
                </div>
            </FocusScope>
        </OverlayContainer>
    );
};

export { SlideOver };
