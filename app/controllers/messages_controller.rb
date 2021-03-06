class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json { @new_messages = @messages.where('id > ?', params[:id]) }
    end
  end

  def create
    @message = current_user.messages.new(message_params)
    @message.user_id = current_user.id
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(params[:group_id])}
        format.json
      end
    else
      flash[:notice] = "メッセージを入力してください"
      redirect_to group_messages_path(params[:group_id])
    end
  end

  private

  private
  def message_params
    params.require(:message).permit(:body, :image, :user_id).merge(group_id: params[:group_id])
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
