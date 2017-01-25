class Api::V1::AdminUsers::SupportAdminsController < Api::V1::BaseController

  before_action do
    authenticate
  end

  def index
    @support_admins = SupportAdmin.where.not(id: current_support_admin.id)
    standard_response(data: @support_admins, serializer: SupportAdminSerializer)
  end

  def create
    @support_admin= SupportAdmin.new(support_admin_params)
    if @support_admin.save
      standard_response(message: "Support Admin User successfully created",
                        data: @support_admin,
                        serializer: SupportAdminSerializer,
                        status: 201)
    else
      error_response(message: @support_admin.errors.full_messages.to_sentence,
                     fields_errors: @support_admin.errors_hash, status: 422)
    end
  end

  def show
    @support_admin = SupportAdmin.find(params[:id])
    standard_response(data: @support_admin, serializer: SupportAdminSerializer)
  end


  def authenticate
    authenticate_resource(:support_admin)
  end

  private

    def support_admin_params
      params.require(:record).permit(
        :email,
        :role,
        :password,
        :password_confirmation
      )
    end

end