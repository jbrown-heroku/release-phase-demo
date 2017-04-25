# Release Phase Demo App

This is a simple Node.js app to show the a database migration using Heroku's [release phase](https://devcenter.heroku.com/articles/release-phase).

### Demo Setup
Fork this repo to your own GitHub account  
Click ➡ https://github.com/heroku-demos/release-phase-demo/fork

Setup a Heroku Pipeline with staging and production apps
```shell
heroku pipelines:setup nodejs-release-phase
# provide your forked copy of the repository when prompted for one: <YOUR_GITHUB_USER>/release-phase-demo
# then answer No to all questions
# the name nodejs-release-phase is used to name the automatically create staging and production apps; if that name is being used by another app, this step will fail. Use a different name.
```

Git clone code locally and install dependencies with [yarn](https://yarnpkg.com/en/docs/install)
```shell
git clone git@github.com:<YOUR_GITHUB_USER>/release-phase-demo.git
cd release-phase-demo
yarn
```

Add staging app as git remote to which we will deploy
```shell
heroku git:remote -a nodejs-release-phase-staging
```

Update your environment PATH variable so `sequelize` can be called without its full path. You'll have to re-run this any time you open a new shell.
```shell
declare -x PATH=$PATH:$(pwd)/node_modules/.bin
```

### Demo Flow
1. Show pipeline
1. Show current state of app  
  Select "Open app in browser" from pipeline's staging app
1. Create new table by creating a new model and migration  
  `sequelize model:create --name Post --attributes title:string,author:string,body:text`  
  If the `sequelize` command does not work, you probably need to add its directory to your environment's PATH variable. Run this command from the `release-phase-demo` directory to do that: `declare -x PATH=$PATH:$(pwd)/node_modules/.bin`
1. Add and commit new model and migration files  
  `git add migrations models`  
  `git commit -m 'Add Post model'`
1. Add `release` line in Procfile. This is what executes the migration after build but before deploy.
1. Deploy and show CLI ouput (not split screen).  
  `git push heroku master`
1. When build and deploy are finished, open staging app (which shows new DB structure created by our migration)  
  Select "Open app in browser" from staging app
1. In the pipeline dashboard, promote app from staging to production.  This will cause release phase to run again.
1. Show release phase running on the "production" card UI and expand the "Releasing" dialog

### Local Development
Setup
```shell
docker-compose up -d
yarn
sequelize db:migrate
```
If the `sequelize` command does not work, you probably need to add its directory to your PATH. Run this command from the `release-phase-demo` directory: `declare -x PATH=$PATH:$(pwd)/node_modules/.bin`

Run
```shell
npm start
# Open localhost:3000
```

Finish
```shell
docker-compose down
```
