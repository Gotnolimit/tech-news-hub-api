const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let articles = [
  {
    id: 1,
    title: 'Welcome to Tech News Hub',
    author: 'Isaac',
    date: new Date().toISOString(),
    content: 'Your source for the latest tech news and insights.'
  }
];

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Tech News Hub API is running!',
    endpoints: {
      getArticles: 'GET /api/articles',
      getArticle: 'GET /api/articles/:id',
      createArticle: 'POST /api/articles',
      deleteArticle: 'DELETE /api/articles/:id'
    }
  });
});

// GET all articles
app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// GET single article
app.get('/api/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  
  res.json(article);
});

// POST new article
app.post('/api/articles', (req, res) => {
  const newArticle = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    date: new Date().toISOString(),
    content: req.body.content || ''
  };
  
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// DELETE article
app.delete('/api/articles/:id', (req, res) => {
  const initialLength = articles.length;
  articles = articles.filter(a => a.id !== parseInt(req.params.id));
  
  if (articles.length === initialLength) {
    return res.status(404).json({ error: 'Article not found' });
  }
  
  res.json({ message: 'Article deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});