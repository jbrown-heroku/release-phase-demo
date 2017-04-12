# Release Phase Demo App

This is a simple Node.js app to show the a database migration using Heroku's [release phase](https://devcenter.heroku.com/articles/release-phase).

### Demo Setup
Setup a Heroku Pipeline with staging and production apps
```shell
heroku pipelines:setup nodejs-release-phase
# provide this repository when prompted for one: crcastle/release-phase-demo
# then answer No to all questions
# nodejs-release-phase is used to name the automatically created staging and production apps; if that name is being used by another app, this step will fail. Use a different name.
```

Fork this repo on GitHub (https://github.com/crcastle/release-phase-demo/fork), then clone the fork and install the application's dependencies.
```shell
# To fork, goto: https://github.com/crcastle/release-phase-demo/fork
git clone git@github.com:crcastle/release-phase-demo.git
cd release-phase-demo
yarn
```

Add staging app as git remote we will deploy to
```shell
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
1. Deploy. During deploy show split screen of streaming logs (from previous step) and web browser showing pipeline with app being built. Click "Show Build Log" on app so we can now see both the build log in the browser and the app logs on the command line.  
  `git push heroku master`
1. When build and deploy are finished, open staging app (which shows new DB structure created by our migration)  
  Select "Open app in browser" from staging app

### Local Development
Setup
```shell
docker-compose up -d
yarn
node_modules/.bin/sequelize db:migrate
```

Run
```shell
npm start
# Open localhost:3000
```

Finish
```shell
docker-compose down
```
