class Course < ApplicationRecord
  before_create do |course|
    session = OpenTokClient.create_session
    course.identifier = session.session_id
  end

  belongs_to :user
end
