import Modal from "./Modal";
import { useState, useRef } from "react";
const File = ({fileText = '', id ='', isError = '', setFieldValue, children }) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploaded, setIsUploaded] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleSave = () => {
        if (!file) {
            setIsUploaded(false);
            setOpen(false);
            return;
        }
        setFieldValue(id, file);
        setIsUploaded(true);
        setOpen(false);    
    }
    const handleRemove = () => {
        setFile(null);
        setFieldValue(id, null);
        setIsUploaded(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
    };
    return (
        <div className='file-style'>
            <div>{fileText}</div>
            {children}
                {isError && <div className='error-text'>{isError}</div>}
            <div className="border border-gray-200 bg-gray-200 border-dashed rounded-xl cursor-pointer p-8 w-32 h-28 flex justify-center items-center" onClick={() => {setOpen(true) }}>
                
                <img src="/add2.png" className="" />
            </div>
            
            {isUploaded && <div className="text-sm font-urbanist text-secondary">{file?.name} <img src="https://app.shnp.me/close.svg" role="button" className="p-1 cursor-pointer" onClick={handleRemove} />  </div>}
            <Modal open={open} onClose={() => {setOpen(false) }}>
                <div className="flex flex-col gap-4">
                    <input type="file"
                        ref={fileInputRef}
                        onChange={(e) => { setFile(e.target.files?.[0] || null); }}
                        className=" invisible"
                    />
                    <div className="border border-gray-200 bg-white border-dashed rounded-xl cursor-pointer p-8 w-full h-28 flex justify-center items-center" onClick={() => {fileInputRef.current?.click(); }}>
                        <div className="text-lg font-urbanist text-primary font-semibold">Drag and drop a file here or click</div>
                        <img src="cloud-upload.svg" className="size-6 m-2" />
                        </div>
                    {file && <div
                        className="text-sm font-urbanist text-secondary">{file.name}
                        <img src="https://app.shnp.me/close.svg" role="button" className="p-1 cursor-pointer" onClick={handleRemove} />
                    </div> }
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        className="bg-primary text-white rounded-lg px-4 py-2"
                        onClick={handleSave}
                        >
                            Save
                    </button>
                    <button className="bg-gray-200 text-gray-500 rounded-lg px-4 py-2" onClick={() => {setOpen(false)}}>Cancel</button>
                    </div>
                </Modal>
        </div>
    
    );
}
export default File;