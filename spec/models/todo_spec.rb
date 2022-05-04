require "rails_helper"

RSpec.describe Todo, :type => :model do
  let(:person) {
    User.create(username: "leew1e", password: "password")
  }

  subject {
    described_class.new(title: "my todo", user_id: person.id, done: "0")
  }

  describe "Associations" do
    it { should belong_to(:user).without_validating_presence }
  end

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without a title" do
      subject.title = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without a status" do
      subject.done = nil
      expect(subject).to_not be_valid
    end
  end
end
