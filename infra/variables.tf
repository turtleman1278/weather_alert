variable "aws_region" {
  type = string
}

variable "project_name" {
  type = string
}

variable "instance_name" {
  type = string
}

variable "ami_id" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "key_name" {
  type = string
}

variable "app_port" {
  type    = number
  default = 3000
}

variable "allowed_ssh_cidr" {
  type = string
}

variable "security_group_name" {
  type = string
}

variable "security_group_description" {
  type = string
}

variable "http_port" {
  type    = number
  default = 80
}
