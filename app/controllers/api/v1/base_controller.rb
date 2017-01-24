class Api::V1::BaseController < ActionController::Base

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  # Response structure:
  #   {
  #     data: ...,
  #     meta: {
  #       message: string
  #     }
  #   }
  def standard_response(message: "", data: {}, status: 200, metadata: {}, serializer: nil)
    metadata.merge!(message: message)

    if(data.is_a?(Array) || data.is_a?(ActiveRecord::Relation))
      data = { "records" => data.map{|item| serializer.new(item).as_json } }
    elsif !data.is_a? Hash
      data = serializer.new(data).as_json
    end

    render(json: {"metadata" => metadata }.merge({data: data}).to_json,
           status: status)
  end


  # Error response structure:
  # {
  #   errors: message,
  #   meta: {
  #     fields_errors: fields_errors
  #   }
  # }
  def error_response(message: nil, fields_errors: nil, status: 500)
    err = {
      errors: message,
      meta: {
        fields_errors: fields_errors
      }
    }
    render(json: err.to_json, status: status)
  end

  def record_not_found
    error_response(message: "record not found", status: 404)
  end

  def current_customer
    current_resource(:customer)
  end

  def current_support_admin
    current_resource(:support_admin)
  end

  def authenticate_resource(resource_identifier)
    if current_resource(resource_identifier).blank?
      error_response(message: 'Invalid Credentials.', status: 401) and return
    end
  end

  private
    def current_resource(resource_identifier)
      if params[:auth_token].present?
        resource_class = resource_identifier.to_s.camelize.constantize
        resource_class.find_by auth_token: params[:auth_token]
      end
    end

end
