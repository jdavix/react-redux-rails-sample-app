class TicketSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :subject, :description, :status, :emergency_level
end