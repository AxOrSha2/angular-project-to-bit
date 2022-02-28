const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        let user_data;
        user_data = new User(req.body);
        await user_data.save();
        res.send(user_data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}

exports.findUser = async (req, res) => {
    try {
        const user_data = await User.findById(req.params.id);
        if (!user_data) {
            res.status(404).json({
                mensaje: 'No se encontraron coincidencias'
            })
        }
        res.json(user_data);
    } catch (error) {

    }
}

exports.findUsers = async (req, res) => {
    try {
        const user_data = await User.find();
        res.json(user_data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { fullName, email, cellphone, address} = req.body
        let user_data = await User.findById(req.params.id);
        //
        if (!user_data) {
            res.status(404).json({
                mensaje: 'No se encontraron coincidencias'
            });
        }
        //
        user_data.fullName = fullName;
        user_data.email = email;
        user_data.cellphone = cellphone;
        user_data.address = address;
        //
        user_data = await User.findOneAndUpdate({ _id: req.params.id}, user_data, {new: true});
        res.json(user_data);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
} 

exports.deleteUser = async (req, res) => {
    try {
        const user_data = await User.findById(req.params.id);
        //
        if (!user_data) {
            res.status(404).json({
                mensaje: 'No se encuentran coincidencias.'
            });
        }
        //
        await User.findByIdAndRemove({ _id: req.params.id});
        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}