function RecentGiftsPagination() {
    return ( 
        <div className='pagination'>
            <button className='pagelabel'><i className='fa fa-angle-left'></i>Prev</button>
            <div className='nums'>
            <button className='pagenum'>1</button>
            <button className='pagenum'>2</button>
            <button className='pagenum'>3</button>
            <button className='pagenum'>4</button>
            </div>
            <button className='pagelabel'>Next<i className='fa fa-angle-right'></i></button>
        </div>
     );
}

export default RecentGiftsPagination;