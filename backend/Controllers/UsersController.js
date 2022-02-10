const User = require('../Models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let adresseMailRegex = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

exports.all = async (req, res, next) => {
    const users = await User.findAll();
    return res.status(200).json(users);
};

exports.signup =  (req, res, next) => {
    if(!adresseMailRegex.test(req.body.email)){
      console.log('Veuillez renseigner une adresse valide');
      next();
    }
    else{
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user =  User.create({
                              username : req.body.username,
                              email: req.body.email,
                              password : hash
          });
       res.status(201).json({message : 'utilisateur créé'});
      })
      .catch(error => res.status(500).json({ error }));
};
};

exports.login = async (req, res, next) => {
  const user =  await User.findOne({ where: { email: req.body.email } });
  
              console.log(user);
              console.log(req.body.password);

              if (!user) {return res.status(401).json({ error: 'Utilisateur non trouvé !' });}
              else { 
              bcrypt.compare(req.body.password, user.password)
                    .then(valid => { if (!valid) { return res.status(401).json({ error: 'problème mot de passe !' })}
                                     else {res.status(200).json({
                                      userId: user.id,
                                      token: jwt.sign(
                                        { userId: user.id },
                                        process.env.APP_KEY,
                                        { expiresIn: '24h' }
                                      )
                                    });}
                                })
                    .catch(error => res.status(500).json({ error: 'erreur 1' }))
                };
        
            };
  