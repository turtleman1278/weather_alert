output "instance_id" {
  value = aws_instance.weather_app.id
}

output "public_ip" {
  value = aws_instance.weather_app.public_ip
}

output "public_dns" {
  value = aws_instance.weather_app.public_dns
}
