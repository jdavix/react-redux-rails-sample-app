class Api::V1::TicketsController < Api::V1::BaseController

  before_action do
    authenticate_resource(:customer)
  end

  def index
    scope = params[:scope]
    scope = "all" if scope.blank?
    if Ticket.scopes.include?(scope.to_sym)
      @tickets = current_customer.tickets.send(scope.to_sym)
      standard_response(data: @tickets, serializer: TicketSerializer)
    else
      error_response(message: "invalid scope", status: 500)
    end
  end

  def create
    @ticket = Ticket.new(ticket_params)
    @ticket.customer = current_customer
    if @ticket.save
      standard_response(message: "ticket successfully sent",
                        data: @ticket,
                        serializer: TicketSerializer,
                        status: 201)
    else
      error_response(message: @ticket.errors.full_messages.to_sentence, 
                     fields_errors: @ticket.errors.full_messages, status: 422)
    end
  end

  def show
    @ticket = current_customer.tickets.find(params[:id])
    standard_response(data: @ticket, serializer: TicketSerializer)
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