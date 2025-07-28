const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/news/daily - Fetch daily top headlines
router.get('/daily', async (req, res) => {
  try {
    console.log('Fetching news from NewsAPI...');
    
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        pageSize: 10,
        apiKey: process.env.NEWS_API_KEY
      }
    });
    
    res.json({
      success: true,
      count: response.data.articles.length,
      articles: response.data.articles
    });
  } catch (error) {
    console.error('NewsAPI Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news articles',
      error: error.message
    });
  }
});

module.exports = router;
