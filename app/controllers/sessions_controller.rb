class SessionsController < Devise::SessionsController

  def destroy
    clear_session(current_support_admin) if current_support_admin
    clear_session(current_customer) if current_customer
    respond_to_on_destroy
  end

  def clear_session(resource)
    #Invalidating current auth token:
    resource.assign_auth_token!

    #Signing out resource session
    sign_out(resource)
  end
end