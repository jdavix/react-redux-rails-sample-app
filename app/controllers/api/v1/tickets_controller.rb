class Api::V1::TicketsController < Api::V1::BaseController

  before_action do
    authenticate
  end

  #load tickets and ability to filter by scope
  #This is the main tickets controller, used by admin_users/tickets_controller to modularize common behavior.
  def index
    filter = params[:scope]
    filter = "all" if filter.blank?
    filter = filter.to_sym
    if Ticket.scopes.include?(filter)
      @tickets = scope.send(filter).order_by_action_time(filter)
      standard_response(data: @tickets, serializer: TicketSerializer)
    else
      error_response(message: "invalid scope", status: 500)
    end
  end

  #create a ticket, filtered by current authorized resource. 
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

  #create a ticket, filtered by current authorized resource. 
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
      params.require(:record).permit(
        :subject,
        :description,
        :emergency_level
      )
    end

end