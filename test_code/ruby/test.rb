#!/usr/bin/ruby
puts "Content-type:text/html"
puts ""
puts "<h1>Hello Ruby world!</h1>"
for i in 0..5
   puts "Value of local variable is #{i}"
   puts "<br>"
end
