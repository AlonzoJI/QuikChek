const axios = require('axios');

class FactCheckService {
  static async checkClaim(query) {
    try {
      console.log('Checking claim with Google Fact Check API:', query);
      
      const response = await axios.get('https://factchecktools.googleapis.com/v1alpha1/claims:search', {
        params: {
          query: query,
          key: process.env.GOOGLE_FACT_CHECK_API_KEY
        }
      });
      
      if (response.data.claims && response.data.claims.length > 0) {
        return response.data.claims.map(claim => ({
          text: claim.text,
          claimant: claim.claimant,
          claimDate: claim.claimDate,
          claimReview: claim.claimReview ? claim.claimReview.map(review => ({
            publisher: review.publisher.name,
            url: review.url,
            title: review.title,
            reviewDate: review.reviewDate,
            textualRating: review.textualRating,
            languageCode: review.languageCode
          })) : []
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Fact Check API Error:', error.message);
      console.error('Response data:', error.response?.data);
      throw new Error('Failed to fact-check claim');
    }
  }

  static async verifyTranscript(transcript) {
    try {
      const sentences = transcript
        .split(/\.\s+|\n+/)
        .map(s => s.trim())
        .filter(s => s.length > 10);

      const factCheckResults = [];

      for (const sentence of sentences.slice(0, 5)) { 
        const claims = await this.checkClaim(sentence);
        if (claims.length > 0) {
          factCheckResults.push({
            claim: sentence,
            factChecks: claims
          });
        }
      }

      return factCheckResults;
    } catch (error) {
      console.error('Transcript verification error:', error.message);
      throw error;
    }
  }
}

module.exports = FactCheckService;
