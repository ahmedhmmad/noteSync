import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { FrontendLayer } from './constructs/frontend';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Frontend Layer:s3 and cloudfront
    const frontendLayer = new FrontendLayer(this, 'FrontendLayer');

    new cdk.CfnOutput(this, 'CloudFrontendUrl', {
      value: frontendLayer.cloudFrontUrl,
    });

  }
} 