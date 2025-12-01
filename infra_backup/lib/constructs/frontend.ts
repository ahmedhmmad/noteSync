import { Construct } from "constructs";
import { BlockPublicAccess,Bucket } from "aws-cdk-lib/aws-s3";
import { RemovalPolicy } from "aws-cdk-lib";
import { AllowedMethods, CachePolicy, Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import path from "path";

export class FrontendLayer extends Construct {
    public readonly cloudFrontUrl: string;
   constructor(scope: Construct, id: string) {
    super(scope, id);

    //S3 Bucket for the frontend
    const websiteBucket= new Bucket(this,'frontend-bucket',{
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'index.html',
        removalPolicy: RemovalPolicy.DESTROY,   
        autoDeleteObjects: true,
        publicReadAccess: false,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });

    //CloudFront Distribution for the frontend
    const distribution = new Distribution(this,'frontendDistribution',{
        defaultRootObject: 'index.html',
        defaultBehavior: {
            origin: S3BucketOrigin.withOriginAccessControl(websiteBucket),
            viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
            cachePolicy: CachePolicy.CACHING_OPTIMIZED,
        },
    });

    //Deployment frontend
    const frontendPath=path.join(__dirname, '..','..','..','frontend','dist');
    new BucketDeployment(this,'frontendDeployment',{
        sources: [Source.asset(frontendPath)], 
        destinationBucket: websiteBucket,
        distribution,
        distributionPaths: ['/*'],
    });

    this.cloudFrontUrl=`https://${distribution.distributionDomainName}`;
}
}
