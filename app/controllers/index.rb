enable :sessions

get '/' do
  @tripmaps = Tripmap.all
  @users = User.all
  erb :index
end

post '/' do
  @user = User.create(params)
  redirect '/'
end

get '/login' do
  erb :_login, :layout => true
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
  @tripmap = Tripmap.create(title: params[:title])
  redirect '/'
end


get '/tripmaps/:id' do
  @tripmap = Tripmap.find(params[:id])
  erb :map
end

