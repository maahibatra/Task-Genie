const axios = require('axios');

module.exports = async (req, res) => {
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
    console.error('Error calling Hugging Face API:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
};
