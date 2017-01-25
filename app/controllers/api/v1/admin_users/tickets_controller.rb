class Api::V1::AdminUsers::TicketsController < Api::V1::TicketsController

  def update_status
    @ticket = Ticket.find(params[:id])

    if Ticket::STATUS_ACTIONS.include?(params[:status_action])
      if params[:status_action].present?
        @ticket.answer = params[:answer] if params[:answer].present?
        @ticket.send("#{ params[:status_action] }!".to_sym)
        standard_response(data: @ticket, serializer: TicketSerializer)
      else
        error_response(message: "missing required params, must send status_action and answer", status: 500)
      end
    else
      error_response(message: "invalid status action #{params[:status_action]}", status: 500)
    end
  end

  def authenticate
    authenticate_resource(:support_admin)
  end

  def scope
    @scope = Ticket.all
  end

end