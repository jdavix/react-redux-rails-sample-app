class CustomerPortal::BaseController <  ApplicationController
  before_action :authenticate_customer!

  #this actions allow us to setup the React js app for customers, auth_token is given to the react js app. 
  def index
    @namespace = "customers"
    @auth_token = current_customer.auth_token
  end
end