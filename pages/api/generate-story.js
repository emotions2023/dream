import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { dreamElements } = req.body;
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: "claude-3-opus-20240229",
          messages: [
            {
              role: "user",
              content: `以下の夢の要素を使って短い物語を作成してください: ${dreamElements}`
            }
          ],
          max_tokens: 1000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.CLAUDE_API_KEY
          }
        }
      );

      const storyText = response.data.content[0].text;
      res.status(200).json({ result: storyText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating the story.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}