
const Question = ({questionText = '', placeholderText = '',inputType = 'text', value, handleChange, handleBlur, id='', isError, children}) => {
    return (
        <div className='input-block'>
            <div className='input-title'>{questionText}</div>
            <div className="flex flex-row items-center border border-gray-300 rounded-2xl bg-gray-100 ">
                <input type={inputType} placeholder={placeholderText} value={value} onChange={handleChange} onBlur={handleBlur} id={id} className= "input-style"/>
                {children}
            </div>
                {isError && <div className='error-text'>{isError}</div>}
        </div>
    
    );
}

export default Question;