// api/generate-tasks.js

const axios = require('axios');

module.exports = async (req, res) => {
  // CORS headers for local testing, adjust as needed for Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error calling Hugging Face API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error processing your request' });
  }
};
