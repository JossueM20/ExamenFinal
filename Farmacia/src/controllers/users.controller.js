const User = require('..//models/User');
const usersCtrl = {};
const passport = require('passport');


usersCtrl.renderSignUpForm = (req, res) => {
    res.render('./users/signup')
};

usersCtrl.registrarse = async (req, res) => {
    const errors = [];
    const {nombre, edad, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(password.length < 5){
        errors.push({text: 'Las contraseñas deben contener al menos 6 caracteres'});
    }
    if(errors.length > 0){
        res.render('./users/signup', {
            errors,
            nombre,
            edad,
            email,
            password,
            confirm_password
        })
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'El correo ya está en uso');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({nombre, edad, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Registro exitoso!');
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('./users/signin')
};

usersCtrl.loguearse = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/',
    failureFlash: true 
});

/*usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Sesión Cerrada');
    res.redirect('/users/signin');
};*/

usersCtrl.logout = (req, res) => {
    req.logout( (err) => {
        if (err) { return next(err); }
        req.flash( "success_msg" , "Sesión Cerrada" );
        res.redirect( "/users/signin" );
    });
}

module.exports = usersCtrl;