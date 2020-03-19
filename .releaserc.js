const dateFormat = require("dateformat");
const readFileAsync = require("fs").promises.readFile;
const { join } = require("path");

const TEMPLATE_DIR =
  "node_modules/semantic-release-gitmoji/lib/assets/templates";
const template = readFileAsync(join(TEMPLATE_DIR, "default-template.hbs"));
const commitTemplate = readFileAsync(join(TEMPLATE_DIR, "commit-template.hbs"));

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
