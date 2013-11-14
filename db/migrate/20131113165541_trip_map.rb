class TripMap < ActiveRecord::Migration
  def change
    create table :tripmaps do |t|
      t.string :title
      t.string :description
      t.timestamps
    end
  end
end
