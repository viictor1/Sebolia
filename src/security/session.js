const getSession = (req, res) =>{
    res.json({ user: req.session.user} );
}
module.exports = {
    getSession
};