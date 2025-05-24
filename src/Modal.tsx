
import { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
    return open ? (
        <div 
        onClick={onClose}
        // ${open ? "visible bg-black/20" : "invisible" }
        className={'fixed inset-0 flex justify-center items-center transition-colors'}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`w-1/2 p-8 border border-zinc-950  bg-white rounded-xl shadow-lg transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1"
                >
                    <img src="/close2.svg" className="" />
                </button>


            {children}
            </div>
        </div>
    ): null;
}
export default Modal;