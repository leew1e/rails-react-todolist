require "rails_helper"

RSpec.describe User, :type => :model do
  subject {
    described_class.new(username: "user", password: "password")
  }

  describe "Associations" do
    it { should have_many(:todos) }
  end

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without a username" do
      subject.username = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without a password" do
      subject.password = nil
      expect(subject).to_not be_valid
    end
    it "is not valid if a password has less than 8 chars" do
      should validate_length_of(:password).is_at_least(8)
    end
  end
end
