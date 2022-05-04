class Todo < ApplicationRecord
  belongs_to :user
  #validates :done, presence: true, default: false
  validates :title, presence: true, length: { minimum: 1 }
end
