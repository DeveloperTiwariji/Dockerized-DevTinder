variable "aws_region" {
  type    = string
  default = "ap-south-1"   # change if you want
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "ssh_public_key_path" {
  type    = string
  default = "~/.ssh/devtinder_key.pub"
}
