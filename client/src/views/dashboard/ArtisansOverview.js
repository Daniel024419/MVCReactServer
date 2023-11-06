

const ArtisansOverview = () => {
	return (
		<>
		 <span className="title-top"><i className="fas fa-tachometer">
            </i> Dashbaord <span> > </span><i className="fas fa-users"></i>  Artisans</span>
                <div className="boxes">
                    <div className="box box1">
                        <i className="uil fas fa-users"></i>
                        <span className="text">Active</span>
                        <span className="number">120</span>
                    </div>
                    <div className="box box2">
                        <i className="uil fas fa-users"></i>
                        <span className="text">Inactive</span>
                        <span className="number">220</span>
                    </div>
                    <div className="box box3">
                        <i className="uil fas fa-users"></i>
                        <span className="text">Last Visits</span>
                        <span className="number">10</span>
                    </div>

                </div>
            

            </>
	)
}



export default ArtisansOverview