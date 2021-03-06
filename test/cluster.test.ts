import * as k3s from '../src';
import { App, Stack, RemovalPolicy } from '@aws-cdk/core';
import '@aws-cdk/assert/jest';

test('create the default cluster', () => {
  
  // GIVEN
  const app = new App();
  const stack = new Stack(app, 'testing-stack');
  
  // WHEN
  new k3s.Cluster(stack, 'Cluster')

  // THEN
  
  expect(stack).toHaveResource('AWS::AutoScaling::AutoScalingGroup', {
    MaxSize: '3',
    MinSize: '3',
    LaunchConfigurationName: {
      Ref: 'ClusterWorkerAsgLaunchConfig70B7BCB1',
    }})

  expect(stack).toHaveResource('AWS::AutoScaling::LaunchConfiguration')
});

test('add s3 removalPolicy', () => {
  const app = new App();
  const stack = new Stack(app, 'testing-stack');
  new k3s.Cluster(stack, 'Cluster-s3-removalPolicy',{
    bucketRemovalPolicy: RemovalPolicy.DESTROY,
  })
  expect(stack).toHaveResource('AWS::S3::Bucket');
  expect(stack).toHaveResource('AWS::CloudFormation::CustomResource',{
    Bucket: {
      Ref: 'Clusters3removalPolicyk3sBucket7F058C67',
    },
  });
});
