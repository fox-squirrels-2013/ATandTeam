class CreateTripmap < ActiveRecord::Migration
  def change
    create_table :tripmaps do |t|
      t.string :title
      t.string :description
      t.timestamps
    end
  end
end
