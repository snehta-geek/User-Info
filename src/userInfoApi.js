import mongoose from 'mongoose';

import Users from './userModel.js';



export const userData = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body

    let user = await Users.findOne({ email: req.body.email.toLowerCase().trim() })
    if (user) return res.send('user already added')

    if (req.file.size > 2000000) {
      return res.json({
        status: false,
        message: "Photo Size must be less than 2MB",
      });
    }

    user = new Users({
      name,
      email,
      mobile,
      password,
      image: req.file.filename
    })

    const newUserData = await user.save()
    if (newUserData) {
      return res.status(201).json({
        status: true,
        data: newUserData,
        message: "User Data Saved Successfully"
      }
      )
    }
    else {
      res.status(400).send({})
    }


  } catch (error) {
    return res.send(error);
  }
}

export const updatedUserData = async (req, res) => {
  try {
    const {name, email, mobile, password } = req.body

    const getUser = await Users.findById(req.params.id)

    if (getUser) {
      getUser.name = name || getUser.name
      getUser.email = email || getUser.email
      getUser.mobile = mobile || getUser.mobile
      getUser.password = password || getUser.password

      if (req.file && req.file.size > 2000000) {
        return res.json({
          status: false,
          message: "Photo Size must be less than 2MB",
        })
      } 
      getUser.image = req.file && req.file.filename || getUser.image   
     
      const updatedUserData = await getUser.save()
      if (updatedUserData) {
        res.status(200).json({
          status: true,
          data: updatedUserData,
          message: "User Data Updated Successfully"
        }
        )
      } else {
        res.status(400).send({})
      }
    }

  } catch (error) {
    return res.send(error);
  }
}

