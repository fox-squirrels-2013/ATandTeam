class CreateMarker < ActiveRecord::Migration
  def change
    create_table :markers do |g|
      g.belongs_to :tripmap
      g.string :name
      g.float :lat
      g.float :long
      g.string :icon
      g.string :description
      g.timestamps
    end

  end
end
