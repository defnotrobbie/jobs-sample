if (process.env.LOCAL) {
  module.exports = {
    apiHost: "http://localhost:4041/api",
    appHost: "http://localhost:4040",
    // formBuilderHost: "http://localhost:4041/FormBuilder",
    name: "jobs"
  };
} else if (process.env.NODE_ENV !== "development") {
  module.exports = {
    apiHost: "https://api.chasapps.upenn.edu/CHCJobs",
    appHost: "https://chjobs.chasapps.upenn.edu",
    formBuilderHost: "https://api.chasapps.upenn.edu/FormBuilder",
    name: "chcjobs"
  };
} else {
  module.exports = {
    apiHost: "https://api.dev.chasapps.upenn.edu/CHCJobs",
    appHost: "https://node.dev.chasapps.upenn.edu",
    formBuilderHost: "https://api.dev.chasapps.upenn.edu/FormBuilder",
    name: "chcjobs"
  };
}

