#!/usr/bin/env node

const { GitSmart } = require('../src/GitSmart')
const { parseArgs, showHelp } = require('../src/utils/args')
const { GitUtils } = require('../src/utils/git')
const { HistoryAnalyzer } = require('../src/analyzers/HistoryAnalyzer')

async function main() {
  try {
    const args = parseArgs(process.argv.slice(2))
    
    if (args.help) {
      showHelp()
      process.exit(0)
    }

    // v1.1.0: Handle new analysis options
    if (args.analyze || args.profile) {
      await handleAnalysisMode(args)
      process.exit(0)
    }

    const gitSmart = new GitSmart({
      interactive: args.interactive,
      verbose: args.verbose,
      dryRun: args.dryRun,
      enhanced: args.enhanced  // v1.1.0: Pass enhanced option
    })

    await gitSmart.run()
  } catch (error) {
    console.error('❌ Error:', error.message)
    if (process.argv.includes('--verbose')) {
      console.error(error.stack)
    }
    process.exit(1)
  }
}

// v1.1.0: New analysis mode for --analyze and --profile options
async function handleAnalysisMode(args) {
  try {
    // Validate git repository
    if (!GitUtils.isGitRepository()) {
      throw new Error('Not a git repository')
    }

    const historyAnalyzer = new HistoryAnalyzer()
    const commits = GitUtils.getRecentCommits(100) // More commits for better analysis
    const analysis = historyAnalyzer.analyzeCommitHistory(commits)
    
    if (args.analyze) {
      displayDetailedAnalysis(analysis)
    }
    
    if (args.profile) {
      displayStyleProfile(analysis, historyAnalyzer)
    }
    
  } catch (error) {
    console.error('❌ Analysis Error:', error.message)
    throw error
  }
}

function displayDetailedAnalysis(analysis) {
  console.log('\n📊 Detailed Commit History Analysis')
  console.log('=====================================')
  
  console.log(`\n📈 Commit Style: ${analysis.style}`)
  console.log(`📏 Average Length: ${analysis.averageLength} characters`)
  console.log(`🎯 Tone: ${analysis.tone}`)
  
  if (analysis.vocabularyProfile) {
    console.log('\n📝 Vocabulary Analysis:')
    console.log(`  Formal: ${(analysis.vocabularyProfile.formal * 100).toFixed(1)}%`)
    console.log(`  Casual: ${(analysis.vocabularyProfile.casual * 100).toFixed(1)}%`)
    console.log(`  Technical: ${(analysis.vocabularyProfile.technical * 100).toFixed(1)}%`)
    console.log(`  Business: ${(analysis.vocabularyProfile.business * 100).toFixed(1)}%`)
  }
  
  if (analysis.typeFrequency && analysis.typeFrequency.length > 0) {
    console.log('\n🏷️  Most Used Commit Types:')
    analysis.typeFrequency.slice(0, 5).forEach((type, index) => {
      console.log(`  ${index + 1}. ${type.type}: ${type.count} times (${(type.frequency * 100).toFixed(1)}%)`)
    })
  }
  
  if (analysis.confidenceFactors) {
    console.log('\n🎯 Quality Metrics:')
    console.log(`  Consistency: ${(analysis.confidenceFactors.consistency * 100).toFixed(1)}%`)
    console.log(`  Conventional Adherence: ${(analysis.confidenceFactors.conventionalAdherence * 100).toFixed(1)}%`)
    console.log(`  Scope Usage: ${(analysis.confidenceFactors.scopeUsage * 100).toFixed(1)}%`)
    console.log(`  Message Quality: ${(analysis.confidenceFactors.messageQuality * 100).toFixed(1)}%`)
  }
}

function displayStyleProfile(analysis, historyAnalyzer) {
  console.log('\n👤 Your Commit Style Profile')
  console.log('=============================')
  
  const enhancedGuide = historyAnalyzer.generateEnhancedStyleGuide(analysis)
  
  console.log(`\n🎨 Style: ${enhancedGuide.vocabularyStyle || 'balanced'}`)
  console.log(`📝 Format: ${enhancedGuide.useConventional ? 'Conventional Commits' : 'Free form'}`)
  console.log(`🎯 Confidence Score: ${(enhancedGuide.confidenceScore * 100).toFixed(1)}%`)
  
  if (enhancedGuide.preferredScopes && enhancedGuide.preferredScopes.length > 0) {
    console.log('\n🏷️  Your Preferred Scopes:')
    enhancedGuide.preferredScopes.forEach((scope, index) => {
      console.log(`  ${index + 1}. ${scope.scope} (${(scope.frequency * 100).toFixed(1)}%)`)
    })
  }
  
  if (enhancedGuide.mostUsedTypes && enhancedGuide.mostUsedTypes.length > 0) {
    console.log('\n📊 Your Most Used Types:')
    enhancedGuide.mostUsedTypes.forEach((type, index) => {
      console.log(`  ${index + 1}. ${type.type} (${(type.frequency * 100).toFixed(1)}%)`)
    })
  }
  
  if (enhancedGuide.recommendations && enhancedGuide.recommendations.length > 0) {
    console.log('\n💡 Recommendations:')
    enhancedGuide.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`)
    })
  }
}

main()