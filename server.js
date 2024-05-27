import express from 'express';
import bodyParser from 'body-parser'; // Import bodyParser
import { appendFile } from 'fs';
import cors from 'cors'; // Import the cors middleware

const app = express();
const port = 3001;

app.use(bodyParser.json()); // Use bodyParser middleware directly

// Enable CORS for all routes
app.use(cors());

app.post('/api/send-text', (req, res) => {
  const receivedText = req.body.text;
//   console.log('Received text from frontend:', receivedText);

  // Save received text into a file
  appendFile('received_text.txt', receivedText + '\n', (err) => {
    if (err) {
      console.error('Error appending text to file:', err);
      res.status(500).send('Error appending text to file');
      return;
    }
    // console.log('Text appended to file');
    res.send(`Text appended to file, your response was: ${receivedText}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
