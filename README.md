# TaskManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version **8.3.0.**

**Note:** 
1. Make sure the MongoDb database is up and running on port **27017**. Please refer to the DataTier setup steps @ https://github.com/avik-fse/fse-data-tier/blob/master/README.md.
2. The task-manager-api is up and running on port 8080_

### Steps for building the Presentation Tier Locally to test with local api running in spring boot embeded tomcat:

1. Get the source code from git repo:  
   `git clone https://github.com/avik-fse/task-manager-ui.git`

2. From command prompt, go to the root folder of the application in the checked out location (i.e inside task-manager-ui):
   
   a. Run the below command to get the dependent modules:  
      `npm install`
      
   b. Update the api urls in **task-manager.service.ts** file and remove the `/task-manager-api` from the beginning of each url
   
   c. Run the below command to compile and start the UI application:  
      `npm start`

### Steps for creating the prod build

1. Get the source code from git repo:  
   `git clone https://github.com/avik-fse/task-manager-ui.git`
   
2. From command prompt, go to the root folder of the application in the checked out location (i.e inside task-manager-ui):
   
   a. Run the below command to get the dependent modules:  
      `npm install`
      
   b. Run the below command to create the distribution package:
      `ng build --prod --base-href=/task-manager/`
      
   c. Copy the 'task-manager' folder from the 'dist' folder and put it in the server
