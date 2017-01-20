class SupportAdmin::BaseController <  ApplicationController
  before_action :authenticate_support_admin!
end