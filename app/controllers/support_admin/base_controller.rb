class SupportAdmin::BaseController <  ApplicationController
  before_action :authenticate_support_admin!

  def index
    @namespace = "support_admin"
    @auth_token = current_support_admin.auth_token
  end
end