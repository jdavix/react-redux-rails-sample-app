class TicketSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :subject, :description, :status, :emergency_level

  def status
    object.status_label
  end
end