const Section = ({columnTile ='', columnDescription ='', gridClassName ='', titleClassName ='', img ='', children}) => { 
    return (
        <div className={gridClassName}>

            <div className={titleClassName}>
                <div className="flex justify-start items-center gap-2">
                <img src={img}  className="w-8" />
                <div className='text-xl font-urbanist text-secondary'>{columnTile}</div>
                </div>
                
                <p className='text-sm font-urbanist text-secondary'>{columnDescription}</p>
            </div>
            {children}
        </div>
    );
}
export default Section;