class TicketSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :subject, :description, :status, :status_label, :emergency_level, :support_admin

  def status_label
    object.status_label
  end

  def support_admin
    object.support_admin.try(:email)
  end

end