class TicketSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :subject, :description, :status, :status_label, :emergency_level

  def status_label
    object.status_label
  end

end