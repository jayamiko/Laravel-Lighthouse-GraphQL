import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

function Modal(props: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-gray-700 font-medium text-center">{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
