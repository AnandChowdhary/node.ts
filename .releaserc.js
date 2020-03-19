const dateFormat = require("dateformat");
const readFileAsync = require("fs").promises.readFile;

const template = readFileAsync(path.join(TEMPLATE_DIR, "default-template.hbs"));
const commitTemplate = readFileAsync(
  path.join(TEMPLATE_DIR, "commit-template.hbs")
);

module.exports = {
  plugins: [
    [
      "semantic-release-gitmoji",
      {
        releaseRules: {
          major: [":boom:"],
          minor: [":sparkles:"],
          patch: [":bug:", ":ambulance:", ":lock:"]
        },
        releaseNotes: {
          template,
          partials: { commitTemplate },
          helpers: {
            datetime: (format = "UTC:yyyy-mm-dd") => {
              return dateFormat(new Date(), format);
            }
          },
          issueResolution: {
            template: "{baseUrl}/{owner}/{repo}/issues/{ref}",
            baseUrl: "https://github.com",
            source: "github.com"
          }
        }
      }
    ],
    "@semantic-release/github",
    "@semantic-release/npm"
  ]
};
