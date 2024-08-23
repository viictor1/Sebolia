const authPage = (permissions) =>{
    return (req, res, next) =>{
        const userRole = req.session.user;

        if(!userRole){
            return json.status(401).json("É necessário fazer login para acessar.");
        }

        if(permissions.includes(userRole)){
            next();
            return;
        }

        return json.status(401).json("Usuário não possui permissão para acessar");
    }
}

module.exports = {
    authPage
}