class Tripmap < ActiveRecord::Base
  has_many :markers
  belongs_to :user

  def user_name
    User.find(self.user_id).username
  end 
end
