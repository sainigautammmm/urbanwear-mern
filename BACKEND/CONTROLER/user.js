const userModel = require("../MODEL/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        sucess: false,
        message: " missing an input field",
      });
    }

    const isuser = await userModel.findOne({ email });

    if (isuser) {
      return res.status(400).json({
        sucess: false,
        message: "user alredy existed with this email",
      });
    }

    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
    const hashpassword = await bcrypt.hash(password, 10);

    const newuser = await userModel.create({
      name,
      email,
      password: hashpassword,
      otp,
    });

    const mailMessage = {
      from: process.env.GMAIL,
      to: email,
      subject: "ACCOUNT VERIFICATION",
      HTML: `
        <h1>otp verification </h1>
        <p>this is your  otp verify your otp account ${otp} do not share</p>
        <h2>thanks for ${name} registring with us</h2>
        `,
    };

    await transport.sendMail(mailMessage);

    res.status(201).json({
      sucess: true,
      message: "user registered sucessfully",
      Data: newuser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      message: "something went wrong",
    });
  }
};

const otpverification = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        sucess: false,
        message: "missing an input field",
      });
    }

    const isuser = await userModel.findOne({ email });

    if (!isuser) {
      return res.status(400).json({
        sucess: false,
        message: "user not found with this  email",
      });
    }

    if (isuser.otp !== otp) {
      return res.status(400).json({
        sucess: false,
        message: "invalid otp",
      });
    }

    isuser.otp = null;
    isuser.isverified = true;

    await isuser.save();

    return res.status(200).json({
      sucess: true,
      message: "otp verifed sucessfully",
      Data: isuser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "something went wrong",
    });
  }
};


const loginuser =    async (req,res)=>{
      
  try {
        const {email,password} = req.body;

        if (!email || !password) {
                  return res.status(400).json({
                    sucess:false,
                    message:"missing an input field",  
                  })
        }


         const isuser =   await  userModel.findOne({email});

         if (!isuser) {
             return res.status(400).json({
              sucess:false,
              message:"user not found with this email",
             })
         }


      

      const correctpass = await bcrypt.compare(password,isuser.password);

      if (!correctpass) {
          return res.status(400).json({
            sucess:false,
            message:"wrongpassword",
          })
      }



const token =  await jwt.sign({userId: isuser._id},
  process.env.SECRET_KEY
);


isuser.token = token;

await isuser.save();


res.cookie("userToken",token,{
  httpOnly: true,
  domain:"localhost",
  secure:false,
  maxAge: 1000*60*60,
});


  res.status(200).json({
    sucess:true,
    message:"user login sucessfully",
    Data: isuser,
  })



  } catch (error) {
     console.log(error);
    res.status(500).json({
      sucess:false,
      message:error.message,
    })
  }
}

const userAuthentication =    async (req,res)=>{
  
  try {
       
       const {userToken} = req.cookies;


       if (!userToken) {
           return res.status(400).json({
                sucess:false,
                message:"Bad authentication"
           });
       }
   
       const decoded  =   await jwt.verify(userToken,process.env.SECRET_KEY);

       if (!decoded) {
           return res.status(400).json({
            sucess:false,
            message:'unauthorized acess'
           })
       }

       const isuser = await userModel.findById(decoded.userId)


         if (!isuser) {
             return res.status(400).json({
              sucess:false,
              message:'unauthorized acess'
             })
         }

       return res.status(200).json({
        sucess:true,
        Data:isuser
       })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess:false,
      message:error.message,
    })
  }

}

 const logout =  async (req,res)=>{

   try {

    const {userToken} = req.cookies;

    if(!userToken){
      return res.status(400).json({
    sucess:false,
    message:"bad authentication",

      })
    }

   const decoded = await jwt.verify(userToken,process.env.SECRET_KEY);
        


      if(!decoded){


        return res.status(400).json({
          sucess:false,
          message:'unautorize acess',
        });
      }


  const isuser = await userModel.findById(decoded.userId);
       
  if(!isuser){


    return res.status(400).json({
      sucess:false,
      message:'unauthorized acess',
    })
  }


  isuser.token = null;

  await isuser.save();

  res.clearCookie('userToken');


  res.status(200).json({
    sucess: true,
    message:"account logout sucessfully"
  })
    
   } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess:false,
      message:error.message,
    })
   }


 }


module.exports = {
  registerUser,
  otpverification,
  loginuser,
  userAuthentication,
  logout,
};
