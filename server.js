const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

const app = express();
const PORT = 3000;

// Sample users
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    gender: 'Male',
    phone: '1234567890',
    password: 'password123',
    status: 'pending',
    date: '2023-06-27',
    profile_pic: 'avatar.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    gender: 'Female',
    phone: '9876543210',
    password: 'password456',
    status: 'active',
    date: '2023-06-28',
    profile_pic: 'avatar.jpg',
  },
  {
    id: 3,
    name: 'Alankritha',
    email: 'alan@example.com',
    gender: 'Female',
    phone: '9876763210',
    password: 'password789',
    status: 'pending',
    date: '2023-06-29',
    profile_pic: 'avatar1.jpg',
  },
  {
    id: 4,
    name: 'Likitha',
    email: 'likita@example.com',
    gender: 'Female',
    phone: '9876534210',
    password: 'password@123',
    status: 'deactive',
    date: '2022-06-28',
    profile_pic: 'profile.jpg',
  },
  {
    id: 5,
    name: 'Mounika',
    email: 'mounika@example.com',
    gender: 'Female',
    phone: '8976543210',
    password: 'password126',
    status: 'active',
    date: '2022-07-28',
    profile_pic: 'example.jpg',
  },
  {
    id: 6,
    name: 'Namratha',
    email: 'namu@example.com',
    gender: 'Female',
    phone: '8876543210',
    password: 'password056',
    status: 'pending',
    date: '2022-02-28',
    profile_pic: 'mickey.jpg',
  },
  {
    id: 7,
    name: 'Ramu',
    email: 'ramu@example.com',
    gender: 'male',
    phone: '9876543219',
    password: 'password256',
    status: 'pending',
    date: '2021-06-28',
    profile_pic: 'avatar.jpg',
  },
  {
    id: 8,
    name: 'aditya',
    email: 'aditya@example.com',
    gender: 'male',
    phone: '8886543210',
    password: 'password45',
    status: 'active',
    date: '2022-06-28',
    profile_pic: 'avatar12.jpg',
  },
  {
    id: 9,
    name: 'Jaswinder',
    email: 'jassy@example.com',
    gender: 'male',
    phone: '9896543210',
    password: 'password126',
    status: 'pending',
    date: '2023-01-28',
    profile_pic: 'avatar1.jpg',
  },
  {
    id: 10,
    name: 'Pratik',
    email: 'pratik@example.com',
    gender: 'male',
    phone: '6876543210',
    password: 'password006',
    status: 'de-active',
    date: '2022-06-28',
    profile_pic: 'avatar98.jpg',
  }
  // Add more sample users here...
];

// Endpoint to fetch user data
app.get('/users', (req, res) => {
  res.json(users);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to download user data as CSV
app.get('/download', (req, res) => {
  const transformStream = new Transform({
    objectMode: true,
    transform: (user, encoding, callback) => {
      const csvData = `${user.id},${user.name},${user.email},${user.gender},${user.phone},${user.password},${user.status},${user.date},${user.profile_pic}\n`;
      callback(null, csvData);
    },
  });

  res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200);

  transformStream.pipe(res);
  users.forEach((user) => transformStream.write(user));
  transformStream.end();
});

// Serve the index.html file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
