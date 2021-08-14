const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  const { title } = req.body;

  if (!title) return res.json(400).json({ error: 'Field is required' });

  try {
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

    res.status(201).json({ msg: 'Success' });
  } catch (error) {
    res.status(500).json({ msg: error.message || error.toString() });
  }
}
