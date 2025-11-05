terraform {
  backend "s3" {
    bucket         = "devtinder-terraform-state-2025"
    key            = "devtinder/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "devtinder-tf-locks"
    encrypt        = true
  }
}
