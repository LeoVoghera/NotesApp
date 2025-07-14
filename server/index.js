const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notes.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/notes', notesRoutes);

app.get('/', (req, res) => {
  console.log("Smart notes is running!")
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});