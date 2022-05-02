require "test_helper"

class TodoTest < ActiveSupport::TestCase
  test "todo when user is specified passes validation" do
    assert build(:todo).valid?
  end

  test "todo when user isn`t specified fails validation" do
    refute build(:todo, :invalid).valid?
  end

  test "todo without title fails validation" do
    refute build(:todo, title: "").valid?
  end
end
