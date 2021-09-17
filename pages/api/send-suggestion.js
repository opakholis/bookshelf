import { rateLimit } from '@/utils/rate-limit';
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500 // Max 500 users per second
});

export default async function handler(req, res) {
  const { title } = req.body;

  if (!title) return res.json(400).json({ error: 'Field is required' });

  try {
    await limiter.check(res, 5, 'CACHE_TOKEN'); // 5 requests per minute
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_BOOK_SUGGESTIONS
      },
      properties: {
        title: {
          title: [
            {
              text: { content: title }
            }
          ]
        }
      }
    });

    res.status(201).json({ msg: title });
  } catch (error) {
    res.status(500).json({ msg: error?.message || 'Rate limit exceeded' });
  }
}
