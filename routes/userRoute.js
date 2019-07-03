const fs = require("fs");
const { join } = require("path");

const filePath = join(__dirname, "users.json");

const getUsers = () => {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

    try {
        var jsonModel = JSON.parse(data);
        return sortUser(jsonModel);
    } catch (error) {
        return [];
    }
}

const saveUser = (users) => {
	const usersSorted = sortUser(users);
	fs.writeFileSync(filePath, JSON.stringify(usersSorted, null, "\t"));
}
	

const sortUser = (users) => users.sort((a, b) => a.id - b.id);

const userRoute = (app) => {
    app.route("/users/:id?")
        .get((req, res) => {
            const users = getUsers();

            res.send({ users });
        })
        .post((req, res) => {
            const users = getUsers();

            users.push(req.body);
            saveUser(users);

            res.status(200).send("Salvo com sucesso");
        })
        .put((req, res) => {
            const users = getUsers();

            saveUser(users.map(user => {
                if(user.id === req.params.id){
                    return {
                        ...user,
                        ...req.body
                    }
                }

                return user;
            }))

            res.status(200).send("Usuario atualizado");
        })
        .delete((req, res) => {
            const users = getUsers();

            saveUser(users.filter(user => user.id !== req.params.id))

            res.status(200).send("Usuário excluído com sucesso!");
        });
}

module.exports = userRoute;