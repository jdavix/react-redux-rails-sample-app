require "rails_helper"

RSpec.describe Api::V1::TicketsController, :type => :controller do
  describe "POST #create" do
    let(:customer){FactoryGirl.create(:customer)}
    context "successful sent ticket" do
      before{post :create, params: {auth_token: customer.auth_token, ticket: {subject: "This is a Test Subject", description: "urgent help"}}}
      it{ expect(response).to be_success }
      it{ expect(response).to have_http_status(201) }
      it{ expect(assigns(:ticket)).to be_persisted}
    end

    context "Unsuccessful ticket creation" do
      before{ post :create, params: {auth_token: customer.auth_token, ticket: {subject: "missing description field"}}}
      it{ expect(response).to have_http_status(422) }
      it{ expect(JSON.parse(response.body)).to include("errors") 
      }
    end
  end
  describe "GET #show" do
    let(:customer){FactoryGirl.create(:customer, password: "thisismypaz", password_confirmation: "thisismypaz")}
    let(:ticket){FactoryGirl.create(:ticket, customer: customer)}
    context "found ticket" do
      before{ get :show, params: {auth_token: customer.auth_token, id: ticket.id}}
      it{ expect(response).to be_success }
      it{ expect(response).to have_http_status(200) }
      it{ expect(assigns(:ticket).customer.id).to eq(customer.id)}
    end

    context "not found ticket" do
      before{ get :show, params: {auth_token: customer.auth_token, id: 54434}}
      it{ expect(response).to have_http_status(404) }
      it{ expect(JSON.parse(response.body)).to include("errors")}
    end
  end

  describe "GET #index" do
    let(:customer){FactoryGirl.create(:customer)}
    context "retrieving all records" do
      before{FactoryGirl.create_list(:ticket, 3, customer: customer)}
      before{ get :index, params: {auth_token: customer.auth_token, scope: 'all'}}
      it{ expect(assigns(:tickets).count).to eq(3) }
      it{ expect(response).to have_http_status(200) }
      it{ expect(JSON.parse(response.body)["data"]).to include("records") }
    end

    context "retrieving scoped records" do
      before{FactoryGirl.create_list(:ticket, 5, customer: customer, status: 'resolved')}
      before{ get :index, params: {auth_token: customer.auth_token, scope: "resolved"}}
      it{ expect(response).to be_success }
      it{ expect(response).to have_http_status(200) }
      it{ expect(assigns(:tickets).count).to eq 5}
    end
  end

end