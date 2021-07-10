import Amplify from "aws-amplify";

export const amplifyConfigure = () => {
    // Configure cognito auth for the todo app
    Amplify.configure({
        Auth: {
            region: process.env.REACT_APP_AWS_REGION,
            userPoolId: process.env.REACT_APP_USER_POOL_ID,
            userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEBCLIENT_ID,
        }
    });

    // Configure AppSync GraphQL for use by the todo app
    Amplify.configure({
        "aws_appsync_graphqlEndpoint": process.env.REACT_APP_GRAPHQL_ENDPOINT,
        "aws_appsync_region": process.env.REACT_APP_AWS_REGION,
        "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
        "aws_appsync_apiKey": process.env.REACT_APP_GRAPHQL_API_KEY,
    });
};