const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const fetchuser = require('../middleware/fetchuser')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'wasimAkram';

// const app =express()
// Route 1: create a user using : POST "/api/auth/createuser",NO login requires 

router.post('/createuser',
    //the below array check validation of  user before creating by express-validator
    [
        // username must be an email
        body('name', 'name at least 3 character').isLength({ min: 3 }),
        body('email', 'enter a valid email').isEmail(),
        // password must be at least 5 chars long
        body('password', 'passsword must be greater than 5 character').isLength({ min: 5 }),
    ], async (req, res) => {
        {
            // Finds the validation errors in this request and wraps them in an object with handy functions checks input field is filled or not
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        }
        // Check wheather the user with this email exist already  or not 
        try {


            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email is already exists" })
            }
            //password hashing with bcryptjs for security 
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            //create a new user if user have a unique email
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(authToken)
            // res.json(user)
            res.json(authToken)

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal server occure')
        }


        //   .then(user => res.json(user)).catch(err => {
        //     console.log(err);
        //     res.json({messasge:"please enter a unique value for email"})
        //   });


        //Rooute :2  create a user using : POST "/api/auth/login",NO login requires 
        router.post('/login', [

            body('email', 'enter a valid email').isEmail(),
            body('password', 'passsword can not be blank ').exists(),
        ], async (req, res) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors)
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { email, password } = req.body;
                let user = await User.findOne({ email });
                if (!user) {

                    return res.status(400).json({ error: 'please login with correct email credentials' })
                }
                const passwordCompare = await bcrypt.compare(password, user.password);
                if (!passwordCompare) {

                    return res.status(400).json({ error: 'please login with correct password credentials' })
                }
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, JWT_SECRET);
                console.log(authToken)
                // res.json(user)
                res.json(authToken)
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Internal server occure')
            }
        }

        )
        //Rooute :3  create a user using : POST "/api/auth/getuser", login requires 
        router.post('/getuser', fetchuser, async (req, res) => {

            try {
                let userid = req.user.id;
                const user = await User.findById(userid).select('-password')
                res.send(user)

            } catch (error) {
                console.error(error.message);
                res.status(500).send('Internal server occure')
            }
        })

    })

module.exports = router