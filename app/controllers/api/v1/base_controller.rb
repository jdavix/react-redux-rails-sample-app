#Api::V1::BaseController
# this controler standardize the way an API controller will behave 
class Api::V1::BaseController < ActionController::Base

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  # Response structure:
  #   {
  #     data: ...,
  #     meta: {
  #       message: string
  #     }
  #   }
  # method for returning a successful response and preserve the same json layout over all responses
  def standard_response(message: "", data: {}, status: 200, meta: {}, serializer: nil)
    meta.merge!(message: message)

    if(data.is_a?(Array) || data.is_a?(ActiveRecord::Relation))
      data = { "records" => data.map{|item| serializer.new(item).as_json } }
    elsif !data.is_a? Hash
      data = serializer.new(data).as_json
    end

    render(json: {"meta" => meta }.merge({data: data}).to_json,
           status: status)
  end


  # Error response structure:
  # {
  #   errors: message,
  #   meta: {
  #     fields_errors: fields_errors
  #   }
  # }
  #this is our standard json response render
  def error_response(message: nil, fields_errors: nil, status: 500)
    err = {
      errors: message,
      meta: {
        fields_errors: fields_errors
      }
    }
    render(json: err.to_json, status: status)
  end

  #method used by the rescue of the 404 error
  def record_not_found
    error_response(message: "record not found", status: 404)
  end

  #returns current customer authenticated by auth_token param
  def current_customer
    current_resource(:customer)
  end

  #returns current_support_admin authentiated by auth_token param
  def current_support_admin
    current_resource(:support_admin)
  end

  #this is the method we call in our before action to require authentication
  #it responds with 401 status code and invalid and an error message. 
  def authenticate_resource(resource_identifier)
    if current_resource(resource_identifier).blank?
      error_response(message: 'Invalid Credentials.', status: 401) and return
    end
  end

  private
    # it returns the current resource looking by auth_token param. 
    def current_resource(resource_identifier)
      if params[:auth_token].present?
        resource_class = resource_identifier.to_s.camelize.constantize
        resource_class.find_by auth_token: params[:auth_token]
      end
    end

end
