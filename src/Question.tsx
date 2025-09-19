import React, {ChangeEvent, FocusEvent, ReactNode} from "react";

type QuestionProps = {
    questionText?: string;
    placeholderText?: string;
    inputType?: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    id?: string;
    isError?: string;
    children?: ReactNode;
};

const Question: React.FC<QuestionProps> = ({
                                               questionText = '',
                                               placeholderText = '',
                                               inputType = 'text',
                                               value,
                                               handleChange,
                                               handleBlur,
                                               id = '',
                                               isError,
                                               children
                                           }) => {
    return (
        <div className='input-block'>
            <div className='input-title'>{questionText}</div>
            <div className="flex flex-row items-center border border-gray-300 rounded-2xl bg-gray-100 ">
                <input type={inputType} placeholder={placeholderText} value={value} onChange={handleChange}
                       onBlur={handleBlur} id={id} className="input-style"/>
                {children}
            </div>
            {isError && <div className='error-text'>{isError}</div>}
        </div>

    );
}

export default Question;