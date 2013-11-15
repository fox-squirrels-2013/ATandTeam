get '/' do
  @tripmaps = Tripmap.all
  erb :index
end

get '/tripmaps/new' do
  erb :_create_map, :layout => false
end

post '/tripmaps/new' do
  @tripmap = Tripmap.create(title: params[:title])
  redirect '/'
end


get '/tripmaps/:id' do
	@tripmap = Tripmap.find(params[:id])
  erb :map
end

get '/markers/:map_id' do
	content_type :json
	@markers = Marker.where(tripmap_id: params[:map_id])
	marker_array = @markers.map do |m|
		{desc: m.description, lat: m.lat, long: m.long}
	end
	{markers: marker_array}.to_json
end

post '/savemarker' do
	puts params
	desc = params["markerDescription"].split("=")[1].split("+").join(" ")
	lat = params["markerPostition"].split[0].delete('(').delete(',').to_f
	long = params["markerPostition"].split[1].delete(')').to_f

	Marker.create tripmap_id: 1, #use dat current map helper
	 							lat: lat, 
	 							long: long, 
	 							description: desc
end