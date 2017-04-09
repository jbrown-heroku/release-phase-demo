# Release Phase Demo App

This is a simple Node.js app to show the a database migration using Heroku's [release phase](https://devcenter.heroku.com/articles/release-phase).

### Demo Setup
Setup Heroku Pipeline with staging and production apps
```
heroku pipelines:setup nodejs-release-phase
# provide this repository when prompted for one: crcastle/release-phase-demo
# then answer No to all questions
```

Git clone code locally
```
git clone git@github.com:crcastle/release-phase-demo.git
cd release-phase-demo
```

Add staging app as git remote we will deploy to
```
heroku git:remote -a nodejs-release-phase-staging
```

### Demo Flow
1. Show current state of app  
  Select "Open app in browser" from pipeline's staging app
1. Create new table by creating a new model and migration  
  `node_modules/.bin/sequelize model:create --name Post --attributes title:string,author:string,body:text`
1. Add and commit migration  
  `git add migrations`  
  `git commit -m 'Add Post model'`
1. Show `release` line in Procfile. This is what executes the migration after build but before deploy.
1. In another command prompt window in the same directory, start a stream of logs  
  `heroku logs -t`
1. Deploy. During deploy show split screen of streaming logs (from previous step) and web browser showing pipeline with app being built  
  `git push heroku master`
1. When build and deploy are finished, show updated staging app (which shows new DB structure)  
  Select "Open app in browser" from staging app

### Local Development
Setup
```
docker-compose up -d
yarn
node_modules/.bin/sequelize db:migrate
```

Run
```
npm start
# Open localhost:3000
```

Finish
```
docker-compose down
```
