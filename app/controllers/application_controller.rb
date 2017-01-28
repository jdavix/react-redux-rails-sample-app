class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  layout :layout_by_resource

  before_action :go_to_home

  private
  #redirect to corresponding home page after signin
  def go_to_home
    if current_customer
      if params[:controller] == "support_admin/base"
        redirect_to controller: 'customer_portal/base', action:'index'
      end
    elsif current_support_admin
      if params[:controller] == "customer_portal/base"
        redirect_to controller: 'support_admin/base', action:'index'
      end
    end
  end

  #load authentication page or js apps page layout
  def layout_by_resource
    if devise_controller?
      "landing"
    else
      "application"
    end
  end
end
