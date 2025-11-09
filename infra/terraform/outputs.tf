output "ec2_public_ip" {
  value       = aws_instance.app.public_ip
  description = "Public IP address of the EC2 instance"
}

output "app_public_ip" {
  value = aws_instance.app.public_ip
}

output "app_public_dns" {
  value = aws_instance.app.public_dns
}
