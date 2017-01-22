class TicketSerializer < BaseSerializer

  def as_json
    return {
      ticket: super do |ticket|
        {
          subject: ticket.subject,
          description: ticket.description,
          created_at: ticket.created_at,
          status: ticket.status
        }
      end
    }
  end

end