class Api::ContactsController < ApplicationController
  respond_to :json

  def index
    contacts = Contact.all
    # respond_with Contact.order(first_name: :ASC)
    respond_with contacts.order(updated_at: :DESC)
    # render json: contacts
  end

  def show
    contact = Contact.find(params[:id])
    # respond_with Contact.find(params[:id])
    respond_with contact
    # render json: contact
  end

  def create
    contact = Contact.create(contact_params)
    # render json: contact
    respond_with :api, contact
  end

  def destroy
    # respond_with Contact.destroy(params[:id])
    contact = Contact.find(params[:id])
    contact.destroy
    head :no_content, status: :ok
  end

  def update
    contact = Contact.find(params['id'])
    contact.update(contact_params)
    # render json: contact
    respond_with contact, json: contact
  end

  private

    def contact_params
    params.require(:contact).permit(:first_name, :last_name, :email, :phone_number)

  end
end
