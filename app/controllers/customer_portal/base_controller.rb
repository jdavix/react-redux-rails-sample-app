class CustomerPortal::BaseController <  ApplicationController
  before_action :authenticate_customer!

  def index
    @namespace = "customers"
    @auth_token = current_customer.auth_token
  end
end