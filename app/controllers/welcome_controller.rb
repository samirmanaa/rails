class WelcomeController < ApplicationController
  before_filter :authenticate_user!
  def index
  end

  def profile
    @courses = current_user.courses.paginate(page: params[:page], :per_page => 5)
  end

  def help
  end

  def classroom
  end
end
