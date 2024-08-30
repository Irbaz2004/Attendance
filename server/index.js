const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('./model/User')


const app = express();

const PORT = 3001;


app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/myData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get('/getUsers', async(req,res)=>{
  try{
    const users = await UserModel.find()
    res.json(users)
  }catch(error){
    console.error('Error fetching users:', error); 
    res.status(500).json({ message: 'Error fetching users', error });
  }
})


app.post('/addStudent', async (req, res) => {
  try {
    const { name, registerNumber, yearOfStudying, branchOfStudying, gender } = req.body;
    
    const newStudent = new UserModel({
      name,
      registerNumber,
      yearOfStudying,
      branchOfStudying,
      gender,
    });

    // Save to MongoDB
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student', error });
  }
});



app.delete('/removeStudent', async (req, res) => {
  try {
    const { registerNumber } = req.body; 

    const deletedStudent = await UserModel.findOneAndDelete({ registerNumber });
    
    if (deletedStudent) {
      res.status(200).json({ message: 'Student removed successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error removing student:', error);
    res.status(500).json({ message: 'Error removing student', error });
  }
});



app.put('/updateAttendance', async (req, res) => {
  const { registerNumber, attendance } = req.body;

  try {
    const updatedStudent = await UserModel.findOneAndUpdate(
      { registerNumber },
      { attendance },
      { new: true, runValidators: true }
    );

    if (updatedStudent) {
      res.status(200).json({ message: 'Attendance updated successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ message: 'Error updating attendance', error });
  }
});



mongoose.connection

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)  })
