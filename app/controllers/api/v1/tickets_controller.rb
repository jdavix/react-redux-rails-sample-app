class Api::V1::TicketsController < Api::V1::BaseController

  before_action do
    authenticate
  end

  def index
    filter = params[:scope]
    filter = "all" if filter.blank?
    filter = filter.to_sym
    if Ticket.scopes.include?(filter)
      @tickets = scope.send(filter)
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
    @ticket = scope.find(params[:id])
    standard_response(data: @ticket, serializer: TicketSerializer)
  end


  def authenticate
    authenticate_resource(:customer)
  end

  def scope
    current_customer.tickets
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