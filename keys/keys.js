const keys = {
  google: {
    client_id:
      "689981168473-a5i6vnaq7an583t6a9atv17amondsrv1.apps.googleusercontent.com",
    client_secret: "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",
    web: {
      client_id:
        "689981168473-a5i6vnaq7an583t6a9atv17amondsrv1.apps.googleusercontent.com",
      project_id: "farm-management-dashboard",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: "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",
      redirect_uris: ["http://localhost:4000/login/oauth2/google/redirect"],
      javascript_origins: ["http://localhost:4000"],
    },
  },
  mongodb_uri:
    "mongodb+srv://hai28022002:matkhaulaloz02@mongodb.caqg1s8.mongodb.net/?retryWrites=true&w=majority&appName=mongoDB",
  mongoose_uri:
    "mongodb+srv://hai28022002:matkhaulaloz02@mongodb.caqg1s8.mongodb.net/UsersData",
  session_key: "testkey",
};
module.exports = keys;
