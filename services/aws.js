import AWS from 'aws-sdk';

// Config the region
AWS.config.region = process.env.AWS_S3_REGION;

export default AWS;