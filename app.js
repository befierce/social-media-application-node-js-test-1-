const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const Post = require('./models/main')

const adminRoutes = require('./routes/index');

Post.sync();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



app.use(adminRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});