const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/', (req, res) => {
  console.log(req.body);
  const imagePath = req.body.postLink;
  res.json({imagePath:imagePath})
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});