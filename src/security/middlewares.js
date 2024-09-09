const authPage = (permissions) =>{
    return (req, res, next) =>{
        const user = req.session.user;

        if(!user){
            return res.status(401).json({ message: "É necessário fazer login para acessar." });
        }

        if(permissions.includes(user.role)){
            next();
            return;
        }

        return res.status(401).json({ message: "Usuário não possui permissão para acessar" });
    }
}

module.exports = {
    authPage
}