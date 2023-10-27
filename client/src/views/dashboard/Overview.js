

const Overview = () => {
	return (
		<>
		 <span className="title-top"><i className="fas fa-tachometer"></i> Dashbaord > <i className="fas fa-home"></i>  Home</span>
                <div className="boxes">
                    <div className="box box1">
                        <i className="uil uil-thumbs-up"></i>
                        <span className="text">Total Likes</span>
                        <span className="number">50,120</span>
                    </div>
                    <div className="box box2">
                        <i className="uil uil-comments"></i>
                        <span className="text">Comments</span>
                        <span className="number">20,120</span>
                    </div>
                    <div className="box box3">
                        <i className="uil uil-share"></i>
                        <span className="text">Total Share</span>
                        <span className="number">10,120</span>
                    </div>

                </div>
            

            </>
	)
}



export default Overview