get '/' do
  @tripmaps = Tripmap.all
  erb :index
end

get '/tripmaps/new' do
  erb :create_map, :layout => false
end

post '/tripmaps/new' do
  @tripmap = Tripmap.create(title: params[:title])
  redirect '/'
end


get '/tripmaps/:id' do
  @tripmap = Tripmap.find(params[:id])
  erb :map
end
