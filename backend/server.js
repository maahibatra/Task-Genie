const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/api/generate-tasks', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct',
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.hFKey}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error calling Hugging Face API:', error.response || error);
    res.status(500).json({ error: 'Error processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});