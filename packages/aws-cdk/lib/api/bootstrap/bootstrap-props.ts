import { Tag } from '../../cdk-toolkit';

export const BUCKET_NAME_OUTPUT = 'BucketName';
export const REPOSITORY_NAME_OUTPUT = 'RepositoryName';
export const BUCKET_DOMAIN_NAME_OUTPUT = 'BucketDomainName';
export const BOOTSTRAP_VERSION_OUTPUT = 'BootstrapVersion';
export const BOOTSTRAP_VERSION_RESOURCE = 'CdkBootstrapVersion';

/**
 * Options for the bootstrapEnvironment operation(s)
 */
export interface BootstrapEnvironmentOptions {
  readonly toolkitStackName?: string;
  readonly roleArn?: string;
  readonly parameters?: BootstrappingParameters;
  readonly force?: boolean;

  /**
   * Whether to execute the changeset or only create it and leave it in review.
   * @default true
   */
  readonly execute?: boolean;

  /**
   * Tags for cdktoolkit stack.
   *
   * @default - None.
   */
  readonly tags?: Tag[];

  /**
   * Whether the stacks created by the bootstrap process should be protected from termination.
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-protect-stacks.html
   * @default true
   */
  readonly terminationProtection?: boolean;
}

/**
 * Parameters for the bootstrapping template
 */
export interface BootstrappingParameters {
  /**
   * The name to be given to the CDK Bootstrap bucket.
   *
   * @default - a name is generated by CloudFormation.
   */
  readonly bucketName?: string;

  /**
   * The ID of an existing KMS key to be used for encrypting items in the bucket.
   *
   * @default - use the default KMS key or create a custom one
   */
  readonly kmsKeyId?: string;

  /**
   * The ID of an existing KMS key to be used for encrypting images in the repository.
   *
   * @default - use the default KMS key or create a custom one
   */
  readonly ecrKeyId?: string;

  /**
   * Whether or not to create a new customer master key (CMK)
   *
   * Only applies to modern bootstrapping. Legacy bootstrapping will never create
   * a CMK, only use the default S3 key.
   *
   * @default false
   */
  readonly createCustomerMasterKey?: boolean;

  /**
   * Whether or not to create a new customer master key (CMK)
   */
  readonly ecrCreateCustomerMasterKey?: boolean;

  /**
   * The list of AWS account IDs that are trusted to deploy into the environment being bootstrapped.
   *
   * @default - only the bootstrapped account can deploy into this environment
   */
  readonly trustedAccounts?: string[];

  /**
   * The list of AWS account IDs that are trusted to look up values in the environment being bootstrapped.
   *
   * @default - only the bootstrapped account can look up values in this environment
   */
  readonly trustedAccountsForLookup?: string[];

  /**
   * The ARNs of the IAM managed policies that should be attached to the role performing CloudFormation deployments.
   * In most cases, this will be the AdministratorAccess policy.
   * At least one policy is required if {@link trustedAccounts} were passed.
   *
   * @default - the role will have no policies attached
   */
  readonly cloudFormationExecutionPolicies?: string[];

  /**
   * Identifier to distinguish multiple bootstrapped environments
   *
   * @default - Default qualifier
   */
  readonly qualifier?: string;

  /**
   * Whether or not to enable S3 Staging Bucket Public Access Block Configuration
   *
   * @default true
   */
  readonly publicAccessBlockConfiguration?: boolean;

}