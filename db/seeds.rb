# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

support = SupportAdmin.find_by email: "admin@support.com"

SupportAdmin.create(email:"admin@support.com", password:"admin123", password:"admin123") if support.nil?

Customer.create(email:"customer@ymail.com", password: "customer123", password_confirmation: "customer123")

#Generating open Tickets
id = 1
50.times { |i|
  ticket = Ticket.new
  ticket.subject = "Subject #{i} is very #{i}"
  ticket.description = "Description #{i}, lorem this is a #{i} description #{i} #{i}"
  ticket.save
  id=id+1
}

#Generating resolved ticket
20.times {
  ticket = Ticket.new
  ticket.subject = "Subject #{id} is very #{id}"
  ticket.description = "Description #{id}, lorem this is a #{id} description #{id} #{id}"
  ticket.status="resolved"
  ticket.created_at = Time.zone.now - 2.months
  ticket.resolved_at = ( (Time.zone.now - 1.months).beginning_of_month)
  ticket.support_admin_id = support.id
  ticket.save(validate:false)
  id=id+1
}
