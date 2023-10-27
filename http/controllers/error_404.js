//invalid route
error_404 = async (req, res) => {
    res.status(404).send('404 Not Found');
};

  
module.exports= {
  error_404:error_404
};