const fetch = require('node-fetch');

async function generateTasks(prompt) {
    const model = 'Qwen/Qwen2.5-Coder-32B-Instruct';

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.hFKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();
    if (data && data[0] && data[0].generated_text) {
        const tasks = data[0].generated_text.split('\n').filter(task => task.trim());
        return tasks;
    } else {
        console.error('Error generating tasks:', data);
        return [];
    }
}