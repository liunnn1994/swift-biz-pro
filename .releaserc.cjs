/**
 * @type {import('semantic-release').GlobalConfig}
 */
const branch = process.env.CI_COMMIT_BRANCH;
const stableBranch = 'main';
const changelogFile = `./CHANGELOG${branch === stableBranch ? '' : '-' + branch}.md`;

const config = {
  branches: [
    stableBranch,
    {
      name: 'development',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile,
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'echo "v${nextRelease.version}" > public/.version',
        successCmd: 'echo "v${nextRelease.version}"',
      },
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: ['package.json', changelogFile, 'public/.version'],
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [],
      },
    ],
  ],
};

module.exports = config;
