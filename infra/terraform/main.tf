# read your SSH public key
data "local_file" "pubkey" {
  filename = pathexpand(var.ssh_public_key_path)
}

# create key pair in AWS
resource "aws_key_pair" "deployer" {
  key_name   = "devtinder-key"
  public_key = data.local_file.pubkey.content
}

# security group to allow SSH and HTTP/HTTPS
resource "aws_security_group" "instance_sg" {
  name        = "devtinder-sg"
  description = "Allow SSH, HTTP, HTTPS inbound"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH"
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP"
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS"
  }
  ingress {
  from_port   = 5173
  to_port     = 5173
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  description = "Frontend (Vite) access"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Use the default VPC - simple for demo
data "aws_vpc" "default" {
  default = true
}

# pick a public subnet in the default VPC
data "aws_subnets" "public" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}


# choose a recent Amazon Linux 2 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_instance" "app" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.instance_type
  subnet_id              = data.aws_subnets.public.ids[0]
  vpc_security_group_ids = [aws_security_group.instance_sg.id]
  key_name               = aws_key_pair.deployer.key_name
  associate_public_ip_address = true

  tags = {
    Name = "devtinder-app"
  }

  # no heavy provisioning here - Ansible will configure the instance
  user_data = <<-EOF
              #!/bin/bash
              # ensure ssh is ready
              yum update -y
              EOF
}

