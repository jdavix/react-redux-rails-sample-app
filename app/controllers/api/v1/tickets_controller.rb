class Api::V1::TicketsController < Api::V1::BaseController

  before_action do
    authenticate_resource(:customer)
  end

  def create
    ticket = Ticket.new(ticket_params)
    if ticket.save
      response_format_json(data: TicketSerializer.new(ticket).as_json, message: "Ticket has been sent!")
    else
      response_error(message: user.errors.full_messages.to_sentence, fields_errors: user.formatted_errors, status: 422)
    end
  end

  private

    def ticket_params
      params.require(:ticket).permit(
        :subject,
        :description,
        :emergency_level
      )
    end

end