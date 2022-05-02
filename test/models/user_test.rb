require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "user with correct data" do
    assert build(:user).valid?
  end

  test "user without username fails validation" do
    refute build(:user, username: nil).valid?
  end

  test "user without password fails validation" do
    refute build(:user, password: nil).valid?
  end

  test "user with password less eight chars fails validation" do
    refute build(:user, password: "qwertyu").valid?
  end

  test "user with not unique username fails validation" do
    User.create(username: "username", password: "password")
    is_unique = User.create(username: "username", password: "password").valid?
    refute is_unique
  end
end
