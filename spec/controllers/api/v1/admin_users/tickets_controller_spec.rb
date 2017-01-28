require "rails_helper"

RSpec.describe Api::V1::AdminUsers::TicketsController, :type => :controller do
  describe "POST #update_status" do
    let(:support_admin){FactoryGirl.create(:support_admin)}
    let(:customer){ FactoryGirl.create(:customer) }
    let(:ticket){ FactoryGirl.create(:ticket, customer:customer ) }
    context "starting a ticket" do
      before{post :update_status, params: { id: ticket.id, auth_token: support_admin.auth_token, status_action:'start'  }}
      it{ expect(response).to be_success }
      it{ expect(response).to have_http_status(200) }
      it{ expect(assigns(:ticket).status).to eq 'inprogress'}
    end

    context "resolving a ticket" do
      let(:ticket){ FactoryGirl.create(:ticket, customer:customer, :status => 'inprogress') }
      before{post :update_status, params: {id: ticket.id, auth_token: support_admin.auth_token, status_action:'resolve'  }}
      it{ expect(response).to be_success }
      it{ expect(response).to have_http_status(200) }
      it{ expect(assigns(:ticket).status).to eq 'resolved'}
    end
  end

  describe "GET #report" do
    let(:support_admin){FactoryGirl.create(:support_admin)}
    let(:customer){ FactoryGirl.create(:customer) }
    context "there are tickets resolved by last month" do
      before {
        4.times {
          FactoryGirl.create(:ticket, customer:customer, status: 'resolved', resolved_at: (Time.zone.now - 1.month))
        }
        allow(GeneratePdf).to receive(:generate_report).and_return("/path-awesome/url")

        get :report, params: { auth_token:  support_admin.auth_token}
      }
      it{ expect(response).to be_success }
      it{ expect(assigns(:tickets).size).to eq 4 }
      it{ expect(JSON.parse(response.body)["data"]["records"].size).to eq 4 }
      it{ expect(JSON.parse(response.body)["meta"]["report_url"]).to eq "/path-awesome/url" }
    end
    context "there are not tickets resolved by last month" do
      before {
        4.times {
          FactoryGirl.create(:ticket, customer:customer)
          FactoryGirl.create(:ticket, customer:customer, status: 'resolved', resolved_at: (Time.zone.now - 5.month))
        }
        allow(GeneratePdf).to receive(:generate_report).and_return("/path-awesome/url")
        get :report, params: { auth_token:  support_admin.auth_token}
      }
      it{ expect(response).to be_success }
      it{ expect(assigns(:tickets).size).to eq 0 }
      it{ expect(JSON.parse(response.body)["data"]["records"].size).to eq 0 }
      it{ expect(JSON.parse(response.body)["meta"]["report_url"]).to eq "/path-awesome/url" }
    end
  end
end