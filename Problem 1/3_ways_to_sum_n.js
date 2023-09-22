//3 ways to sum from 1 to n

var sum_to_n_a = function(n) {
  if (n < 1) {
    return "Invalid input";
  }
  let res = (n * (n + 1)) / 2;
  return res;
};


var sum_to_n_b = function(n) {
  if (n < 1) {
    return "Invalid input";
  }
  let res = 0;
  for (let i = 1; i <= n; i++) {
    res += i;
  }
  return res;
};


var sum_to_n_c = function(n) {
  if (n < 1) {
    return "Invalid input";
  }
  if (n == 1) {
    return 1;
  }
  return sum_to_n_c(n - 1) + n;
};

