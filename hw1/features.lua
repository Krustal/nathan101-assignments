-- extending simple table
fibs = { 1, 1 } -- create generic table here

dynamic_accessor = {
  __index = function(name, n)
    name[n] = name[n - 1] + name[n - 2]
    return name[n]
  end
}
setmetatable(fibs, dynamic_accessor) -- attach the dynamic accessor to the fib table

print(fibs[3])
print(fibs[10])