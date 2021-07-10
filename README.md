# Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:

- yarn
- AWS SAM
- AWS CLI

# Getting Started
This Todo app will be running on as a serverless application on AWS. SAM was used as the deployment mechanism.

In the terminal, navigate to the root of the todo-app and go through the steps in the following sections:

## Infrastructure
- Run `yarn install:infra` - Installs the node_modules for the Lambda handlers

- Run `yarn build:infra` - Builds the serverless application including the Lambda handlers

- Run `yarn deploy:infra --profile <AWS profile>` - Deploys the serverless application on to
  AWS. **IMPORTANT:** Use an AWS profile that has appropriate permissions to deploy a serverless application on AWS.

- The deploy step will prompt with the following questions. **Note**: The **bold** text are potential answers
    - Stack Name: **todo-app** 
    - AWS Region: **us-east-1**
    - Parameter AppName: **todo-app**
    - Confirm changes before deploy: **Y**
    - Allow SAM CLI IAM role creation: **Y**
    - Save arguments to configuration file: **N**
    
- If the changeset is ok, answer **Y** to the `Deploy this changeset?` question

- On successful completion of the deployment, copy the values for the following outputs for use in **Web site** steps
    - UserPoolId
    - UserPoolClientId
    - GraphQLApiId
    - GraphQLApiEndpoint
    - S3BucketDomainName
    - CloudfrontDistributionDomainName
  
## Web site

- Make a copy of the file ./www/.env.sample and call it ./www/.env
- Open ./www/.env file and replace the following env variables with the outputs from the **Infrastructure** steps
    - REACT_APP_USER_POOL_ID=UserPoolId
    - REACT_APP_USER_POOL_WEBCLIENT_ID=UserPoolClientId
    - REACT_APP_GRAPHQL_ENDPOINT=GraphQLApiEndpoint
    - REACT_APP_GRAPHQL_API_KEY=GraphQLApiId

- Run `yarn install:www` - Installs the node_modules for the www site

- Run `yarn build:www` - Build an optimized React application

- Run `yarn deploy:www s3://<Copy the first part of the S3BucketDomainName> --profile <AWS Profile> --recursive` - 
  Deploys the React application to the S3 bucket. **IMPORTANT:** Use the first part of the value from the 
  `S3BucketDomainName` output. For example, the output will look like `4d7856d0-e144-11eb-845a-0ef29e620f87.s3.amazonaws.com`. The first 
  part would be `4d7856d0-e144-11eb-845a-0ef29e620f87`

- Open a browser and paste the outputted value for `CloudfrontDistributionDomainName` into the address bar. The login
screen should (hopefully) appear :-) 


