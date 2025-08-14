class AdaptiveLearningEngine {
  calculateOptimalDifficulty(userPerformance) {
    let optimalLevel = 5; // default middle level
    if (userPerformance.recentAccuracy > 0.8) {
      optimalLevel += 1;
    } else if (userPerformance.recentAccuracy < 0.6) {
      optimalLevel -= 1;
    }
    return Math.max(1, Math.min(10, optimalLevel));
  }

  recommendNextTopics(userData) {
    return userData.weakAreas && userData.weakAreas.length
      ? userData.weakAreas
      : ['Review previous topics'];
  }

  adaptContentStyle(userProfile, engagement) {
    if (engagement.low) {
      if (userProfile.learningStyle === 'visual') return 'Add more visuals and diagrams';
      if (userProfile.learningStyle === 'auditory') return 'Use more audio explanations';
    }
    return 'Maintain current style';
  }
}

module.exports = new AdaptiveLearningEngine();
