// Script to insert demo employees into MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config({ path: '../.env' });

const employees = [
  { 
    name: 'Amit Sharma', 
    email: 'amit@gmail.com', 
    password: 'employee123', 
    role: 'employee', 
    department: 'HR' 
  },
  { 
    name: 'Priya Singh', 
    email: 'priya@gmail.com', 
    password: 'employee123', 
    role: 'employee', 
    department: 'Finance' 
  },
  { 
    name: 'Rohit Verma', 
    email: 'rohit@gmail.com', 
    password: 'employee123', 
    role: 'employee', 
    department: 'IT' 
  },
  { 
    name: 'Sneha Patel', 
    email: 'sneha@gmail.com', 
    password: 'employee123', 
    role: 'employee', 
    department: 'Marketing' 
  },
  { 
    name: 'Vikas Gupta', 
    email: 'vikas@gmail.com', 
    password: 'employee123', 
    role: 'employee', 
    department: 'Sales' 
  },
  { 
    name: 'Anjali Mehra', 
    email: 'anjali@gmail.com', 
    password: 'employee123', 
    role: 'employee', 
    department: 'Support' 
  }
];

async function insertEmployees() {
  await mongoose.connect(process.env.MONGODB_URL,{ 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
  for (const emp of employees) {
    const hash = await bcrypt.hash(emp.password, 10);
    await User.create({ ...emp, password: hash });
    console.log(`Inserted: ${emp.name}`);
  }
  await mongoose.disconnect();
  console.log('All employees inserted!');
}

insertEmployees();
