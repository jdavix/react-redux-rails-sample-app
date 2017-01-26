require "rails_helper"


RSpec.describe Api::V1::AdminUsers::SupportAdminsController, :type => :controller do
  describe "POST #create" do
    let(:support_admin){ FactoryGirl.create(:support_admin) }
    context "successful created an admin" do
      before{post :create, params: {auth_token: support_admin.auth_token, record: {email:"admin@awesome005.com", role:'admin', password:"password123", password_confirmation:"password123"}}}
      it{ expect(response).to be_success }
      it{ expect(response).to have_http_status(201) }
      it{ expect(assigns(:support_admin)).to be_persisted}
    end

    context "Unsuccessful admin creation" do
      before{ post :create, params: {auth_token: support_admin.auth_token, record: {email: "admin@awesome005.com"}}}
      it{ expect(response).to have_http_status(422) }
      it{ expect(JSON.parse(response.body)).to include("errors")}
      it{ expect(JSON.parse(response.body)["meta"]).to include("fields_errors")}
    end

  describe "GET #show" do
    let(:support_admin_record){FactoryGirl.create(:support_admin)}
    let(:support_admin){FactoryGirl.create(:support_admin)}
    context "found ticket" do
      before{ get :show, params: {auth_token: support_admin.auth_token, id: support_admin_record.id}}
      it{ expect(response).to be_success }
      it{ expect(response).to have_http_status(200) }
      it{ expect(assigns(:support_admin).id).to eq(support_admin_record.id)}
    end

    context "not found ticket" do
      before{ get :show, params: {auth_token: support_admin.auth_token, id: 54434}}
      it{ expect(response).to have_http_status(404) }
      it{ expect(JSON.parse(response.body)).to include("errors")}
    end
  end

    describe "GET #index" do
      let(:support_admin){FactoryGirl.create(:support_admin)}
      context "retrieving all records" do
        before{FactoryGirl.create_list(:support_admin, 14)}
        before{ get :index, params: {auth_token: support_admin.auth_token}}
        it{ expect(assigns(:support_admins).count).to eq(14) }
        it{ expect(response).to have_http_status(200) }
        it{ expect(JSON.parse(response.body)["data"]).to include("records") }
      end
    end
  end
end