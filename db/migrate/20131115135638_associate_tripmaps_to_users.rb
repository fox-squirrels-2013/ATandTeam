class AssociateTripmapsToUsers < ActiveRecord::Migration
  def change
    add_column :tripmaps, :user_id, :integer, references: :users
  end
end
