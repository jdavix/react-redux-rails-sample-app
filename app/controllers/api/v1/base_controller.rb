class Api::V1::BaseController < ActionController::Base

  def response_format_json(data: nil, message: "", page: nil)
    structure = {
      data: data,
      meta: {
        message: message
      }
    }
    structure[:meta][:page] = (page + 1) unless page.nil?
    render(json: structure.to_json, status:200)
  end

  def response_error(message: nil, fields_errors: nil, status: nil)
    err = {
      errors: message,
      meta: {
        fields_errors: fields_errors
      }
    }
    render(json: err.to_json, status: status)
  end



  def current_customer
    current_resource(:customer)
  end

  def current_support_admin
    current_resource(:support_admin)
  end

  def authenticate_resource(resource_identifier)
    if current_resource(resource_identifier).blank?
      response_error(message: 'Invalid Credentials.', status: 401) and return
    end
  end

  private
    def current_resource(resource_identifier)
      resource_class = resource_identifier.to_s.camelize.constantize
      resource_class.find_by auth_token: params[:auth_token]
    end

end
