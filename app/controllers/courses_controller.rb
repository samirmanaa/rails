class CoursesController < ApplicationController
  before_action :set_course, only: [:show, :join]
    respond_to :html

  def show
    respond_with(@course)
  end

  def new
    @course = Course.new
    respond_with(@course)
  end

  def create
    @course = Course.new(course_params)
    @course.user_id = current_user.id
    @course.save
    redirect_to @course
  end

  def join
    gon.opentok = opentok_data(@course)
  end

  private
    def set_course
      @course = Course.find(params[:id])
    end

    def opentok_data(course)
      token = OpenTokClient.generate_token(course.identifier)
      { sessionId: course.identifier, apiKey: Figaro.env.opentok_api_key, token: token }
    end

    def course_params
      params.require(:course).permit(:name, :description, :identifier, :user_id)
    end
end
