enable :sessions

get '/' do
  if session[:id]
    @tripmaps = Tripmap.all
    @users = User.all
    erb :index
  else
    redirect '/login'
  end
end

post '/' do
  @user = User.create(params)
  session[:id] = @user.id
  redirect '/'
end

get '/signup' do
  erb :signup
end

get '/logout' do
  session.clear
  redirect '/'
end

get '/login' do
  erb :login, :layout => true
end

post '/login' do
  @user = User.find_by_username(params[:username])
  if @user && @user.password == params[:password]
    session[:id] = @user.id
  end
  redirect '/'
end

get '/tripmaps/new' do
  erb :_create_map, :layout => false
end

post '/tripmaps/new' do
  @tripmap = Tripmap.create(title: params[:title],user_id: session[:id])
  redirect '/'
end

get '/tripmaps/:id' do
	session[:current_map] = Tripmap.find(params[:id])
  @tripmaps = Tripmap.where(user_id: current_map.user_id)

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

  Marker.create tripmap_id: current_map.id, #use dat current map helper
  lat: lat, 
  long: long, 
  description: desc
end
