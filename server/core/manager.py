import utilities
import cloud.aws

class Manager:

    def __init__(self):
        # Read app config
        self.env = utilities.Env()

        # Instantiate cloud provider
        self.provider = cloud.aws.Provider(self.env.get("AWS_REGION"))
