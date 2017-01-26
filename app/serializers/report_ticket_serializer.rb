class ReportTicketSerializer < TicketSerializer
  attributes :id, :created_at, :resolved_at, :subject, :description, :status, :status_label, :emergency_level, :support_admin, :answer

  def resolved_at
    object.resolved_at.strftime("%a, %B %d %H:%M - %Y ")
  end

end