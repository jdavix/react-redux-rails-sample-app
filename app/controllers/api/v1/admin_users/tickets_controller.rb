class Api::V1::AdminUsers::TicketsController < Api::V1::TicketsController

  def update
    @ticket = Ticket.find(params[:id])
  end

  def authenticate
    authenticate_resource(:support_admin)
  end

  def scope
    @scope = Ticket.all
  end

end