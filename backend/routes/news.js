const express = require('express');
const axios = require('axios');
const NewsModel = require('../models/newsModel');
const router = express.Router();

// GET /api/news/daily - Fetch and store daily news
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
    
    const articles = [];
    
    // Process and store each article
    for (const article of response.data.articles) {
      if (article.title && article.description) {
        try {
          // Store article in database
          const savedArticle = await NewsModel.createArticle({
            title: article.title,
            summary: article.description, // We'll improve this with summarization later
            original_content: article.content || article.description,
            source: article.source.name,
            url: article.url,
            published_at: new Date(article.publishedAt),
            readability_score: null // We'll add this with summarization
          });
          
          articles.push(savedArticle);
        } catch (dbError) {
          console.error('Error saving article:', dbError.message);
          // Continue with other articles even if one fails
        }
      }
    }
    
    res.json({
      success: true,
      count: articles.length,
      articles: articles,
      message: `Fetched and stored ${articles.length} articles`
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

// GET /api/news/stored - Get articles from database
router.get('/stored', async (req, res) => {
  try {
    const articles = await NewsModel.getAllArticles(15);
    res.json({
      success: true,
      count: articles.length,
      articles: articles,
      source: 'database'
    });
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stored articles',
      error: error.message
    });
  }
});

module.exports = router;
