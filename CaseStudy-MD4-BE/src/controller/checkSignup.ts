import { User } from "../model/user";

class Validate {
  ValidateUserName = async (Username: string) => {
    let value = await User.findOne({ username: Username });
    console.log('User = ', Username)
    console.log('username = ', value);
    if(value == null) {
      return true
    } else {
      return false
    }
  }

  // Hàm check password (ít nhất 1 ký tự thường, 1 ký tự viết hoa, 1 ký tự đặc biệt, dài từ 6 đến 20 ký tự)
  ValidatePassword = (password: string, repassword: string) => {
    let regExPassword = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/
    );
    if (password.match(regExPassword)) {
      return true;
    } else {
      return false;
    }
  };

  passwordMatch = (password: string, repassword: string) => {
    if (password === repassword) {
      return true;
    } else {
      return false;
    }
  }

  checkEmail = async (Email: string) => {
    let value = await User.findOne({email: Email});
   if(value == null) {
    return true;
   } else {
    return false;
   }
  }

  ValidateEmail = (email: string) => {
    let emailRegex =
      /^(([^<>()[\]\\.,;:!#$%^&*()\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegex)) {
      return true;
    } else {
      return false;
    }
  };

  checkArray = (a: string[]) => {
    let flag = true;
    for (let numb of a) {
      if (numb != " ") {
        if (isNaN(+numb)) {
          flag = false;
        }
      } else {
        flag = false;
      }
    }
    if (flag === true) {
      return true;
    } else {
      return false;
    }
  }

  ValidatePhone = (phone: string) => {
    if (phone) {
      let phoneSplit = phone.split('');
      if (this.checkArray(phoneSplit) && phone.split("").length === 10) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
}

export default new Validate();