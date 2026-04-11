terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
provider "aws" {
  region = var.aws_region
}

resource "aws_security_group" "weather_app_sg" {
  name        = var.security_group_name
  description = var.security_group_description
  vpc_id      = data.aws_subnet.selected.vpc_id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  ingress {
    description = "App port"
    from_port   = var.app_port
    to_port     = var.app_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = var.http_port
    to_port     = var.http_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project_name}" }
}

data "aws_subnet" "selected" {
  id = var.subnet_id
}

resource "aws_instance" "weather_app" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.weather_app_sg.id]

  tags = { Name = var.instance_name }
}

resource "aws_eip" "weather_eip" {
  domain = "vpc"

  tags = {
    Name = "${var.project_name}-eip"
  }
}

# resource "aws_eip_association" "weather_eip_assoc" {
#   instance_id   = aws_instance.weather_app.id
#   allocation_id = aws_eip.weather_eip.id
# }


