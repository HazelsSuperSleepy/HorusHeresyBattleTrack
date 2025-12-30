#!/bin/bash
# Deploy to Vercel Script
# Run this script to deploy your Horus Heresy Battle Repository to Vercel

echo "🛡️  Horus Heresy Battle Repository - Vercel Deployment"
echo "======================================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not found. Initializing git..."
    git init
    git add .
    git commit -m "Initial Horus Heresy Battle Repository"
fi

echo "✅ Project ready for deployment!"
echo ""
echo "Next steps:"
echo "==========="
echo ""
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/HorusHeresyBattleTrack"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   Option A: Visit https://vercel.com and import your GitHub repo"
echo "   Option B: Run 'npm i -g vercel && vercel' in this directory"
echo ""
echo "3. That's it! Your site will be live at a Vercel URL"
echo ""
echo "📚 Full instructions: See DEPLOYMENT.md"
echo "🚀 Ready to launch!"
