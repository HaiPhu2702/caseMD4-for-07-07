import bcrypt from 'bcrypt';
import {User} from "../model/user";
import Validate from "./checkSignup"
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../middleware/auth";
class AuthController {
    register = async (req, res) => {
        let err = '';
        try {
            let userSignUp = req.body;
            userSignUp.role = [];
            let username = userSignUp.username;
            let password = userSignUp.password;
            let repassword = userSignUp.re_password;
            let email = userSignUp.email;
            let phone = userSignUp.phone;
            let customer = '62fc44d848d8e5721c43579e';
            userSignUp.role.push(customer)
            console.log(userSignUp);
            if (await Validate.ValidateUserName(username) &&
                Validate.ValidatePassword(password, repassword) &&
                Validate.passwordMatch(password, repassword) &&
                Validate.ValidateEmail(email) &&
                await Validate.checkEmail(email) &&
                Validate.ValidatePhone(phone)) {
                userSignUp.password = await bcrypt.hash(userSignUp.password, 10);
                await User.create(userSignUp)
                console.log('Sign Up Success!');
                res.status(201).json({
                    status: 'success',
                    err: err
                });
            } else if (await Validate.ValidateUserName(username) == false) {
                err = 'Tài khoản đã tồn tại!'
                res.status(201).json({
                    status: 'fail',
                    err: err
                });
            } else if (Validate.ValidatePassword(password, repassword) == false) {
                err = 'Passwords from 6 to 20 characters, including at least 1 special character, 1 uppercase letter, 1 lowercase letter!'
                res.status(201).json({
                    status: 'fail',
                    err: err
                });
                console.log('Mật khẩu từ 6 đến 20 ký tự, có bao gồm ít nhất 1 ký tự đặc biệt, 1 chữ in hoa, 1 chữ thường!');
            } else if (Validate.passwordMatch(password, repassword) == false) {
                err = 'Incorrect password confirmation!'
                res.status(201).json({
                    status: 'fail',
                    err: err
                });
                console.log('Mật khẩu và mật khẩu xác nhận không khớp!');
            } else if (Validate.ValidateEmail(email) == false) {
                err = 'Wrong email format, Example : myemail@gmail.com'
                res.status(201).json({
                    status: 'fail',
                    err: err
                });
                console.log('Sai định dạng email, email có dạng : myemail@gmail.com!')
            } else if (await Validate.checkEmail(email) == false) {
                err = 'Email already used!'
                res.status(201).json({
                    status: 'fail',
                    err: err
                });
                console.log('Email đã được sử dụng!')
            } else if (Validate.ValidatePhone(phone) == false) {
                err = 'Please enter your phone number in 10 digits!'
                res.status(201).json({
                    status: 'fail',
                    err: err
                });
                console.log('Xin nhập số điện thoại của bạn bằng 10 chữ số!')
            }
        } catch (err) {
            console.log('signUp err: ', err)
        }
        // let user = req.body;
        // user.password = await bcrypt.hash(user.password, 10);
        // user = await User.create(user);
        // res.status(201).json(user);
    }

    login = async (req, res) => {
        let loginForm = req.body;
        let user = await User.findOne({
            username: loginForm.username
        }).populate('role','name');
        console.log(user)
        if (!user) {
            res.status(401).json({
                message: 'Username is not existed!'
            })
        } else {
            let comparePassword = await bcrypt.compare(loginForm.password, user.password);
            if (!comparePassword) {
                res.status(401).json({
                    message: 'Password is wrong'
                })
            } else {
                let payload = {
                    id: user._id,
                    username: user.username,
                    role: user.role[0].name
                }
                let token = await jwt.sign(payload, SECRET_KEY, {
                    expiresIn: 60*60*24*7
                });
                console.log(token)
                res.status(200).json({
                    token: token,
                    role: user.role[0].name
                });
            }
        }
    }
}

export default new AuthController();
