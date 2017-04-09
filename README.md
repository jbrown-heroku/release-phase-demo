# Release Phase Demo App

This is a simple Node.js app to show the main use cases for Heroku's release phase.

The app uses Express, Sequelize, Tape, and Supertest.

### Demo Flow
#### Setup
Setup Heroku Pipeline with staging and production apps
```
heroku pipelines:setup nodejs-release-phase
# provide this repository crcastle/release-phase-demo
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

#### Demo
1. Show current state of app  
  Select "Open app in browser" from pipeline's staging app
1. Create new table by creating a new model and migration  
  `node_modules/.bin/sequelize model:create --name Post --attributes title:string,author:string,body:text`
1. Add and commit migration  
  `git add migrations`  
  `git commit -m 'Add Post model'`
1. Show `release` line in Procfile. This is what executes the migration after build but before deploy.
1. Deploy and show split screen of CLI build output and pipeline show app being built  
  `git push heroku master`
1. When build and deploy are finished, show updated staging app (which shows new table)  
  Select "Open app in browser" from staging app

### Local Development
Setup
```
docker-compose up -d
yarn
node_modules/.bin/sequelize db:migrate

Run
```
npm start
```

Finish
```
docker-compose down
```
